import { ExecutionContext, RequestMethod } from "@nestjs/common";
import { METHOD_METADATA, PATH_METADATA } from "@nestjs/common/constants";
import { Reflector } from "@nestjs/core";
import { AUTO_GUARD_KEY, PERMISSIONS_KEY } from "./jwt.dec";
import { User } from "./user.dto";

export function getNeedPermissions(
  reflector: Reflector,
  context: ExecutionContext,
  authGuardConf: boolean
): User["permissions"] {
  const target = [context.getHandler(), context.getClass()];
  const needSelfPermission =
    reflector.getAllAndOverride<User["permissions"]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) || [];

  const autoGuardDec =
    reflector.getAllAndOverride<boolean>(AUTO_GUARD_KEY, target) ??
    authGuardConf;

  if (autoGuardDec) {
    const action = reflector.getAllAndOverride<RequestMethod>(
      METHOD_METADATA,
      target
    );
    let topResources = reflector.getAllAndOverride<string | Array<string>>(
      PATH_METADATA,
      [target[1]]
    );
    let subResources = reflector.getAllAndOverride<string | Array<string>>(
      PATH_METADATA,
      [target[0]]
    );

    if (!Array.isArray(topResources)) {
      topResources = [topResources ?? ""];
    }
    if (!Array.isArray(subResources)) {
      subResources = [subResources ?? ""];
    }

    for (const topResource of topResources) {
      for (const subResource of subResources) {
        needSelfPermission.push([
          `${topResource.replace(/^\//, "")}/${subResource.replace(/^\//, "")}`,
          action,
        ]);
      }
    }
  }

  return needSelfPermission;
}
