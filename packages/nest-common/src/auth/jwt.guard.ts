import { ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { AUTO_GUARD_KEY, IS_PUBLIC_KEY, OWNER_PERMISSION_KEY } from "./jwt.dec";
import { User } from "./user.dto";
import { getNeedPermissions } from "./utill";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(
    private readonly reflector: Reflector,
    @Inject(AUTO_GUARD_KEY) private readonly autoGuard: boolean
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const publicCanActive = Boolean(
      this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ])
    );
    if (publicCanActive) return true;

    await super.canActivate(context);

    const needPermissions = getNeedPermissions(
      this.reflector,
      context,
      this.autoGuard
    );

    if (!needPermissions?.length) return true;

    const request = context
      .switchToHttp()
      .getRequest<Request & { user: User }>();

    const permissionCanActive = needPermissions.some(([reqScope, reqAction]) =>
      request.user.authorities?.some(([hasScope, hasAction]) => {
        return reqScope === hasScope && reqAction === hasAction;
      })
    );
    if (permissionCanActive) return true;

    const ownerPermissionCallBack = this.reflector.getAllAndOverride<
      (request: Request & { user: User }) => boolean
    >(OWNER_PERMISSION_KEY, [context.getHandler(), context.getClass()]);

    if (ownerPermissionCallBack?.(request)) return true;

    return false;
  }
}
