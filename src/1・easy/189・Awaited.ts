/* _____________ Your Code Here _____________ */

type Thenable<K> = { then: (onfulfilled: (arg: K) => any) => any };

type MyAwaited<T extends Thenable<any>> = T extends Thenable<infer K>
  ? K extends Thenable<any>
    ? MyAwaited<K>
    : K
  : T;
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;
type T = { then: (onfulfilled: (arg: number) => any) => any };

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>
];

// @ts-expect-error
type error = MyAwaited<number>;
