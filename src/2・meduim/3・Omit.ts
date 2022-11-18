/* _____________ Your Code Here _____________ */

// type MyOmit<T, K extends keyof T> = {
//   [S in keyof T extends K ? never : S]: T[S];
// };
type MyOmit<T extends object, K extends keyof T> = {
  [S in keyof T as S extends K ? never : S]: T[S];
};
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, "description">>>,
  Expect<Equal<Expected2, MyOmit<Todo, "description" | "completed">>>
];

// @ts-expect-error
type error = MyOmit<Todo, "description" | "invalid">;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
  completed: boolean;
}

interface Expected2 {
  title: string;
}
