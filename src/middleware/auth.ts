/** @deprecated Import from `@/lib/auth-middleware` instead */
export {
  type AuthTokenPayload,
  type AuthenticatedRequest,
  verifyAuth,
  requireAuth,
  requireAdmin,
  requireClient,
  canAccessResource,
  canAccessAssessment,
} from "@/lib/auth-middleware";
