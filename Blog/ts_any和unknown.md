### any和unknown

>any类型可以理解为任何类型都可以，不在乎是什么类型
>
>unknown类型可以理解为，有类型，但是不知道具体是什么类型

**TypeScript 允许我们对 any 类型的值执行任何操作，而无需事先执行任何形式的检查**。

**TypeScript 会对 unknown 类型的变量执行类型检查**

`需要注意的是，unknown 类型的变量只能赋值给 any 类型和 unknown 类型本身`

如下场景中，表现不太一样

```typescript
type T1 = keyof any;
type T2 = keyof unknown;

type T3<T> = { [P in keyof T]: P };
type T4 = T3<any>; //{[x: string]: string}
type T5 = T3<unknown>;//{}
```

>上述代码中，T3为映射类型，在映射过程中，如果key是never类型，将被过滤。

##### unknown 类型与不同类型进行类型运算的结果

```typescript
// In an intersection everything absorbs unknown
type T00 = unknown & null;  // null
type T01 = unknown & undefined;  // undefined
type T02 = unknown & null & undefined;  // null & undefined (which becomes never in union)
type T03 = unknown & string;  // string
type T04 = unknown & string[];  // string[]
type T05 = unknown & unknown;  // unknown
type T06 = unknown & any;  // any

// In a union an unknown absorbs everything
type T10 = unknown | null;  // unknown
type T11 = unknown | undefined;  // unknown
type T12 = unknown | null | undefined;  // unknown
type T13 = unknown | string;  // unknown
type T14 = unknown | string[];  // unknown
type T15 = unknown | unknown;  // unknown
type T16 = unknown | any;  // any
```

##### any类型与任意类型进行`交叉`或`联合运算`时，都会返回any类型