import type { SessionPayload } from "@/lib/auth";
import { hasAnyRole, type Role } from "@/lib/roles";
import { parentRequestServiceRoles, type ParentRequestService } from "@/lib/parentRequests";

/** Every real role that handles at least one service — used to gate the admin list view. */
const ANY_SERVICE_STAFF_ROLES: Role[] = Array.from(
  new Set(Object.values(parentRequestServiceRoles).flat()),
);

/** True if the session may view/reply to a request routed to this service, as parent-of-record or as staff. */
export function canAccessParentRequest(
  session: SessionPayload,
  request: { parentId: number; service: string },
): boolean {
  if (session.userId === request.parentId) return true;
  const staffRoles = parentRequestServiceRoles[request.service as ParentRequestService] ?? ["ADMIN", "SUPER_ADMIN"];
  return hasAnyRole(session.roles, staffRoles);
}

/** True if the session holds any staff role that handles at least one service. */
export function isAnyParentRequestStaff(session: SessionPayload): boolean {
  return hasAnyRole(session.roles, ANY_SERVICE_STAFF_ROLES);
}
