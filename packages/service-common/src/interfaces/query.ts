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

export type OneQuery<T = unknown> = {
  [k in keyof T]?: [Method, ...Array<T[k]>] | ["$not", Method, ...Array<T[k]>];
};

export type Query<T = unknown> = Array<OneQuery<T>> | OneQuery<T>;
