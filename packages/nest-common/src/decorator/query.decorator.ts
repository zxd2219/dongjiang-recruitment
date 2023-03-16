import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import {
  Between,
  Equal,
  FindOptionsWhere,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from "../typeorm";

const methods = {
  $not: Not,
  $lt: LessThan,
  $lte: LessThanOrEqual,
  $gt: MoreThan,
  $gte: MoreThanOrEqual,
  $eq: Equal,
  $like: Like,
  $iLike: ILike,
  $between: Between,
  $in: In,
  $isnull: IsNull,
};

type Query<T = unknown> = {
  [k in keyof T]: [keyof typeof methods, ...Array<T[k]>];
};

export const QueryParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Array<FindOptionsWhere<unknown>> => {
    const request = ctx.switchToHttp().getRequest<Request>();

    const queries = [request.query["query"]].filter(Boolean).flat();

    return queries.map((query) => {
      const _query = Object.entries(
        JSON.parse(query.toString()) as Query<unknown>
      ) as [keyof unknown, [keyof typeof methods, ...unknown[]]][];
      return _query.reduce((acc, [key, value]) => {
        const [method, ...args] = value;

        return {
          ...acc,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          [key]:
            method === "$not"
              ? methods[method](
                  methods[args[0] as keyof typeof methods].apply(
                    null,
                    args.slice(1)
                  )
                )
              : methods[method].apply(null, args),
        };
      }, {} as FindOptionsWhere<unknown>);
    });
  }
);
