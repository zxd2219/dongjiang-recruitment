interface Base {
  timestamp: string;
  status: number;
  message: string;
}

export interface Normal<T> extends Base {
  body: T;
}
export interface Error extends Base {
  error: string | Array<string>;
}

export type Response<T> = Normal<T> | Error;
