import type { JWTPayload as JosePayload } from "jose";

/** NeuroPet auth claims stored inside JWT tokens */
export interface AuthTokenPayload {
  userId: string;
  email: string;
  name: string;
  role: "admin" | "client";
  clientId?: string;
  assessmentId?: string;
}

function isRole(value: unknown): value is "admin" | "client" {
  return value === "admin" || value === "client";
}

/** Parse verified jose payload into app auth shape — no unsafe casts */
export function parseAuthTokenPayload(
  payload: JosePayload
): AuthTokenPayload | null {
  const { userId, email, name, role, clientId, assessmentId } = payload;

  if (userId == null || email == null || !isRole(role)) {
    return null;
  }

  return {
    userId: String(userId),
    email: String(email),
    name: typeof name === "string" ? name : "",
    role,
    ...(clientId != null ? { clientId: String(clientId) } : {}),
    ...(assessmentId != null ? { assessmentId: String(assessmentId) } : {}),
  };
}
