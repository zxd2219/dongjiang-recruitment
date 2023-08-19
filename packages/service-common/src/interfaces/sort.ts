// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type Sort<T = unknown> = Array<`${keyof T},${"asc" | "desc"}`>;
