import { Expect, Equal } from "utils/index";

// 期望是一个 string 类型
type HelloWorld = string;
// 你需要使得如下这行不会抛出异常
type test = Expect<Equal<HelloWorld, string>>;
