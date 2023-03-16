import { SetMetadata } from "@nestjs/common";
import { User } from "./user.dto";

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const AUTO_GUARD_KEY = "autoGuard";
export const AutoGuard = () => SetMetadata(AUTO_GUARD_KEY, true);

export const PERMISSIONS_KEY = "permissions";
export const Permissions = (...permissions: User["permissions"]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);

export const OWNER_PERMISSION_KEY = "ownerPermission";
export const OwnerPermission = (
  callBack: (request: Request & { user: User }) => boolean
) => SetMetadata(OWNER_PERMISSION_KEY, callBack);
