import type { Ref } from "vue";

type State<R, P> = {
  loading: Ref<boolean>;
  data: Ref<R | undefined>;
  error: Ref<Error | undefined>;
  params: Ref<P>;
};

type MutateData<R> = (newData: R) => void;
type MutateFunction<R> = (arg: (oldData: R) => R) => void;
interface Mutate<R> extends MutateData<R>, MutateFunction<R> {}

interface FunctionContext<R, P extends unknown[]> {
  runAsync: (...arg: P) => Promise<R>;
  run: (...arg: P) => void;
  cancel: () => void;
  refresh: () => void;
  refreshAsync: () => Promise<R>;
  mutate: Mutate<R>;
}

export interface QueryResult<R, P extends unknown[]>
  extends State<R, P>,
    FunctionContext<R, P> {}
