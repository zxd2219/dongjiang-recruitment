import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { FindOptionsOrder } from "../typeorm";

export interface Pagination<T = unknown> {
  page: number;
  size: number;
  sort: FindOptionsOrder<T>;
}

export const Page = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Pagination => {
    const request = ctx.switchToHttp().getRequest<Request>();

    const page = +[request.query["page"]].filter(Boolean).flat()[0] || 0;
    const size = +[request.query["size"]].filter(Boolean).flat()[0] || 5;
    const sort = [request.query["sort"]].filter(Boolean).flat();

    return {
      page,
      size,
      sort: Object.fromEntries(
        sort.map(
          (_sort) =>
            _sort.toString().split(",") as [keyof unknown, "ASC" | "DESC"]
        )
      ),
    };
  }
);
