export function isNullOrUndef(val: any) {
  return val === null || val === undefined;
}

export function isNullOrWhitespace(str: string) {
  return !str || !str.trim();
}
