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

type Operator = [keyof typeof methods, ...unknown[]];

const addKeyValueToObj = (
  obj: Record<string, unknown>,
  key: string,
  value: unknown
) => {
  const [first, ...rest] = key.split(".");
  if (rest.length) {
    obj[first] = obj[first] || {};
    addKeyValueToObj(
      obj[first] as Record<string, unknown>,
      rest.join("."),
      value
    );
  } else {
    obj[first] = value;
  }
};

const processOperator = (operator: Operator) => {
  const [method, ...args] = operator;

  switch (method) {
    case "$not":
      return methods[method](processOperator(args as Operator));
    case "$in":
      return methods[method].call(null, args);
    default:
      return methods[method].apply(null, args);
  }
};
const processQuery = (query: Query<unknown>) => {
  Object.keys(query).forEach((key) => {
    if (key.includes(".")) {
      addKeyValueToObj(query, key, query[key]);
      delete query[key];
    }
  });
  const entries = Object.entries(query) as [keyof unknown, Operator][];
  const _query = Object.fromEntries(
    entries
      .map(([key, value]) => [
        key,
        !Array.isArray(value) && typeof value === "object"
          ? processQuery(value)
          : processOperator(value),
      ])
      .filter(([, value]) => value !== undefined)
  );
  return Object.keys(_query).length ? _query : undefined;
};

export const QueryParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Array<FindOptionsWhere<unknown>> => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const queries = [request.query["query"]].filter(Boolean).flat();
    return queries
      .map((query) => processQuery(JSON.parse(query.toString())))
      .filter(Boolean);
  }
);
