/**
 * Simple In-Memory Rate Limiter
 * 
 * SECURITY: Prevents brute force attacks on authentication endpoints
 * Note: For production with multiple servers, use Redis-based rate limiting
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 60 * 60 * 1000);

export interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number; // Time window in milliseconds
  identifier: string; // IP address or user identifier
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

/**
 * Check if request is within rate limit
 * 
 * @param config Rate limit configuration
 * @returns Result with allowed status and remaining attempts
 */
export function checkRateLimit(config: RateLimitConfig): RateLimitResult {
  const { maxAttempts, windowMs, identifier } = config;
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry || now > entry.resetTime) {
    // No entry or window has expired, create new entry
    const resetTime = now + windowMs;
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime,
    });

    return {
      allowed: true,
      remaining: maxAttempts - 1,
      resetTime,
    };
  }

  // Entry exists and window hasn't expired
  if (entry.count >= maxAttempts) {
    // Rate limit exceeded
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
      retryAfter: Math.ceil((entry.resetTime - now) / 1000), // seconds
    };
  }

  // Increment count
  entry.count++;
  rateLimitStore.set(identifier, entry);

  return {
    allowed: true,
    remaining: maxAttempts - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Get client IP address from request
 */
export function getClientIP(request: Request): string {
  const headers = request.headers;
  
  // Try various headers that might contain the real IP
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIP = headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Fallback to 'unknown' if no IP found
  return 'unknown';
}

/**
 * Create a rate limit identifier combining IP and optional user info
 */
export function createRateLimitIdentifier(
  ip: string,
  additionalInfo?: string
): string {
  return additionalInfo ? `${ip}:${additionalInfo}` : ip;
}

/**
 * Reset rate limit for a specific identifier (e.g., after successful login)
 */
export function resetRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier);
}

/**
 * Preset rate limit configurations
 */
export const RATE_LIMITS = {
  // Authentication endpoints
  LOGIN: {
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
  REGISTER: {
    maxAttempts: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  PASSWORD_RESET: {
    maxAttempts: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  
  // API endpoints
  APPOINTMENT_CREATE: {
    maxAttempts: 10,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  PAYMENT_INTENT: {
    maxAttempts: 10,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  
  // General API
  API_GENERAL: {
    maxAttempts: 100,
    windowMs: 60 * 1000, // 1 minute
  },
} as const;
