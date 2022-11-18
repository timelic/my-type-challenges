/* _____________ Your Code Here _____________ */

type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [S in K]: T[S];
} & {
  [S in Exclude<keyof T, K>]: T[S];
};

// 两种解法一样的
// type MyReadonly2<T, K extends keyof T = keyof T> = {
//   readonly [S in K]: T[S];
// } & {
//   [S in keyof Omit<T, K>]: T[S];
// };

/* _____________ Test Cases _____________ */
import type { Alike, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, "title" | "description">, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, "title" | "description">, Expected>>
];

// @ts-expect-error
type error = MyReadonly2<Todo1, "title" | "invalid">;

interface Todo1 {
  title: string;
  description?: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  description?: string;
  completed: boolean;
}

interface Expected {
  readonly title: string;
  readonly description?: string;
  completed: boolean;
}
