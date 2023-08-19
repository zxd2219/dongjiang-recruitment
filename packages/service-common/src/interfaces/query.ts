type Method =
  | "$lt"
  | "$lte"
  | "$gt"
  | "$gte"
  | "$eq"
  | "$like"
  | "$iLike"
  | "$between"
  | "$in"
  | "$isnull";

type Primitive = string | number | symbol;

type GenericObject = Record<Primitive, unknown>;

export type NestedPaths<T extends GenericObject> = {
  [K in keyof T]: T[K] extends GenericObject
    ? // @ts-ignore
      K | `${K}.${NestedPaths<T[K]>}`
    : K;
}[keyof T];

export type OneQuery<T extends GenericObject> = {
  [k in NestedPaths<T>]?: T[k] extends GenericObject
    ? OneQuery<T[k]>
    : [Method, ...Array<T[k]>] | ["$not", Method, ...Array<T[k]>];
};

export type Query<T extends GenericObject> = Array<OneQuery<T>> | OneQuery<T>;
