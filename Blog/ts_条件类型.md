### 条件类型

>语法:`T extends U ? X : Y`
>
>T、U、X 和 Y 这些都是类型占位符。你可以这样理解该语法，当类型 T 可以赋值给类型 U 时，那么返回类型 X，否则返回类型 Y

---

对于分布式条件类型来说，当传入的被检查类型是联合类型的话，在运算过程中会被分解成多个分支。

```typescript
T extends U ? X : Y 
T => A | B | C 
A | B | C extends U ? X : Y  => 
(A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)
```

**在条件类型中，如果被检查的类型是一个 “裸” 类型参数，即`没有被数组、元组或 Promise `等包装过，则该条件类型被称为分布式条件类型**

```typescript
type Naked<T> = T extends boolean ? "Y" : "N";

type WrappedTuple<T> = [T] extends [boolean] ? "Y" : "N";
type WrappedArray<T> = T[] extends boolean[] ? "Y" : "N";
type WrappedPromise<T> = Promise<T> extends Promise<boolean> ? "Y" : "N";

type T0 = Naked<number | boolean>; // "N" | "Y"
type T1 = WrappedTuple<number | boolean>; // "N"
type T2 = WrappedArray<number | boolean>; // "N"
type T3 = WrappedPromise<number | boolean>; // "N"
```

由以上结果可知，如果条件类型中的类型参数 T 被包装过，该条件类型就不属于分布式条件类型，所以在运算过程中就不会被分解成多个分支

---

了解完条件类型和分布式条件类型的知识点，我们来举例演示一下 TypeScript 内置工具类型 Exclude 的执行流程。

```typescript
type Exclude<T, U> = T extends U ? never : T;
type T4 = Exclude<"a" | "b" | "c", "a" | "b">

("a" extends "a" | "b" ? never : "a") // => never
| ("b" extends "a" | "b" ? never : "b") // => never
| ("c" extends "a" | "b" ? never : "c") // => "c"

never | never | "c" // => "c"
```

掌握了条件类型之后，再结合往期文章中介绍的映射类型，我们就可以实现一些有用的工具类型。比如实现 FunctionProperties 和 NonFunctionProperties 等工具类型。

```typescript
type FunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

interface User {
    id: number;
    name: string;
    age: number;
    updateName(newName: string): void;
}

type T5 = FunctionPropertyNames<User>; // "updateName"
type T6 = FunctionProperties<User>; // { updateName: (newName: string) => void; }
type T7 = NonFunctionPropertyNames<User>; // "id" | "name" | "age"
type T8 = NonFunctionProperties<User>; // { id: number; name: string; age: number; }
```

