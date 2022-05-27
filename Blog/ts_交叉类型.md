### 交叉类型

>在集合论中，假设 A，B 是两个集合，由所有属于集合 A 且属于集合 B 的元素所组成的集合，叫做集合 A 与集合 B 的交集。
>
>---
>
>在 TypeScript 中为我们提供了交叉运算符，来实现对多种类型进行交叉运算，所产生的新类型也被称为交叉类型。

#### 交叉运算符

- 唯一性：`A & A` 等价于 `A`
- 满足交换律：`A & B` 等价于 `B & A`
- 满足结合律：`(A & B) & C` 等价于 `A & (B & C)`
- 父类型收敛：如果 `B` 是 `A` 的父类型，则 `A & B` 将被收敛成 `A` 类型

```typescript
type A0 = 1 & number; // 1
type A1 = "1" & string; // "1"
type A2 = true & boolean; // true

type A3 = any & 1; // any
type A4 = any & boolean; // any
type A5 = any & never; // never
```

any 类型和 never 类型比较特殊。**除了 never 类型之外，任何类型与 any 类型进行交叉运算的结果都是 any 类型**

>在对多个类型进行交叉运算时，若存在相同的属性且属性类型是对象类型，那么属性会按照对应的规则进行合并。

##### 类型都是基本数据类型

```typescript
interface Point {
  x: number;
  y: number;
}

interface Named {
  name: string;
}

type NamedPoint = Point & Named
// {  
//.  x: number;  
//.  y: number;  
//.  name: string;  
//. }
// -------------------------------------
interface X {
  c: string;
  d: string;
}

interface Y {
  c: number;
  e: string
}

type XY = X & Y;
type YX = Y & X;
let p: XY = { c: "c", d: "d", e: "e" }; // Error
let q: YX = { c: 6, d: "d", e: "e" }; // Error
```

因为运算后 c 属性的类型为 `string & number`，即 c 属性的类型既可以是 `string` 类型又可以是 `number` 类型。很明显这种类型是不存在的，所以运算后 c 属性的类型为 `never` 类型。

##### 类型是非基本数据类型

```typescript
interface D { d: boolean; }
interface E { e: string; }
interface F { f: number; }

interface A { x: D; }
interface B { x: E; }
interface C { x: F; }

type ABC = A & B & C;

let abc: ABC = { // Ok
    x: {
      d: true,
      e: '阿宝哥',
      f: 666
    }
};
```

在对多个类型进行交叉运算时，若存在相同的属性且属性类型是对象类型，那么属性会按照对应的规则进行合并。

**但需要注意的是，在对对象类型进行交叉运算的时候，如果对象中相同的属性被认为是可辨识的属性，即属性的类型是字面量类型或字面量类型组成的联合类型，那么最终的运算结果将是 never 类型**

```typescript
type A = { kind: 'a', foo: string };
type B = { kind: 'b', foo: number };
type C = { kind: 'c', foo: number };

type AB = A & B;  // never
type BC = B & C;  // never
```

##### 函数类型

除了对象类型可以进行交叉运算外，函数类型也可以进行交叉运算：

```typescript
type F1 = (a: string, b: string) => void;  
type F2 = (a: number, b: number) => void;

let f: F1 & F2 = (a: string | number, b: string | number) => { };  
f("hello", "world");  // Ok  
f(1, 2);              // Ok 
f(1, "test");   // Error
//没有与此调用匹配的重载。
//  第 1 个重载(共 2 个)，“(a: string, b: string): void”，出现以下错误。
//    类型“number”的参数不能赋给类型“string”的参数。
//  第 2 个重载(共 2 个)，“(a: number, b: number): void”，出现以下错误。
//    类型“string”的参数不能赋给类型“number”的参数。ts(2769)
// ------------------------------------------------------------
type F1 = (a: string, b: string) => void;  
type F2 = (a: number, b: number) => void;
type F3 = (a: number, b: string) => void;

let f: F1 & F2 & F3 = (a: string | number, b: string | number) => { };  
f("hello", "world");  // Ok  
f(1, 2);              // Ok 
f(1, "test");   // Ok
```

