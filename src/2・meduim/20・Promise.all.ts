/* _____________ Your Code Here _____________ */

type PromiseUnWrap<T> = T extends Promise<infer S> ? PromiseUnWrap<S> : T;

type helper<T extends readonly any[]> = T extends [
  infer First,
  ...infer Follows
]
  ? [PromiseUnWrap<First>, ...helper<Follows>]
  : [];

declare function PromiseAll<T extends unknown[]>(
  values: readonly [...T]
): Promise<helper<T>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

const promiseAllTest1 = PromiseAll([1, 2, 3] as const);
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const);
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)]);

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>
];
