### 泛型工具

---

>更多具体类型，可以推荐使用:https://github.com/piotrwitek/utility-types

##### Partial\<T>

>此工具的作用就是将泛型中全部属性变为可选的

```typescript
type Partial<T> = {
  [key in keyof T]?:T[key]
}
```

```typescript
type Animal = {
  name: string,
  category: string,
  age: number,
  eat: () => number
}
type PartOfAnimal = Partial<Animal>;
const cat: PartOfAnimal = { name: 'ww' }; // 属性全部可选后，可以只赋值部分属性了
```

##### Record\<K,T>

>此工具的作用是将 K 中所有属性值转化为 T 类型，我们常用它来申明一个普通 object 对象

```typescript
type Record<K extends keyof any,T> = {
  [key in K]: T
}
```

这里特别说明一下，`keyof any`对应的类型为`number | string | symbol`，也就是可以做对象键(专业说法叫索引 index)的类型集合。

```typescript
const obj: Record<string, string> = { 'name': 'zhangsan', 'tag': '打工人' }
```

##### Pick\<T,K>

>将T类型中包含K键列表部分提取出来，生成新的子键值对类型

```typescript
type Pick<T,K extends keyof T> ={
  [P in K]: T[P]
}
type Person = {
    name: string;
    age: number;
};
type p1 = Pick<Person, "age">; 
```

##### Exclude\<T,U>

>在T类型中，去除T类型和U类型的交集，返回剩余部分

```typescript
type Exclude<T,U> =  T extends U ? never : T;
```

```typescript
type T1 = Exclude<"a" | "b" | "c", "a" | "b">;   // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number
```

##### Omit<T,K>

>此工具可认为是适用于键值对对象的 Exclude，它会去除类型 T 中包含 K 的键值对。
>
>`在定义中，第一步先从 T 的 key 中去掉与 K 重叠的 key，接着使用 Pick 把 T 类型和剩余的 key 组合起来即可。`

```typescript
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
```

##### ReturnType\<T>

>获取 T 类型(函数)对应的返回值类型：

```typescript
type ReturnType<T extends Function> = T extends (...arg: any[]) => infer R
    ? R
    : never;
```

```typescript
function foo(x: string | number): string | number {
  return x;
}

type t1 = ReturnType1<typeof foo>; //string | number
```

##### Required\<T>

>类型 T 中所有的属性变为必选项

```typescript
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

```typescript
type Person = {
  name: string;
  age: number;
};

type t1 = Partial<Person>; //{name?: string;age?: number;}

type t2 = Required1<t1>; //{name: string;age: number;}

type Required1<T> = {
  [P in keyof T]-?: T[P];
};
```

##### FunctionPropertyNames\<T>

>获取类型中是函数类型对应名称

```typescript
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T]
```

```typescript
interface User {
  id: number;
  name: string;
  age: number;
  updateName(newName: string): void;
}
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T]

type T1 = FunctionPropertyNames<User> //type T1 = "updateName"
```

##### FunctionProperties\<T>

>获取类型中的函数类型

```typescript
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
```

##### NonFunctionPropertyNames\<T>

>获取类型中不是函数类型对应名称

```typescript
type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
```

```typescript
interface User {
  id: number;
  name: string;
  age: number;
  updateName(newName: string): void;
}
type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
type T1 = NonFunctionPropertyNames<User> //type T1 = "id" | "name" | "age"
```

##### PartialByKeys<T,K extends keyof T>

>用于把对象类型中指定的 keys 变成可选的

```typescript
type Simplify<T> = {
  [P in keyof T]: T[P];
};
type User = {
  id: number;
  name: string;
  age: number;
};

type PartialByKeys<T, K extends keyof T> = Simplify<
  Partial<T> & Pick<T, Exclude<keyof T, K>>
>;

type U1 = PartialByKeys<User, "id">; //{id?: number;name: string;age: number;}
type U2 = PartialByKeys<User, "id" | "name">; //{id?: number;name?: string;age: number;}
```

具体梳理下实现思路

```typescript
//目标是 type PartialByKeys<T, K extends keyof T>
type T1 = Simplify< //{id?: number;name: string;age: number;}
  {
    id?: number;
    name?: string;
    age?: number;
  } & {
    name: string;
    age: number;
  }
>;
//按照以上实现 为实现type主要方式
//剩余就是传入动态参数
type Simplify<T> = {
  [P in keyof T]: T[P];
};

type T1<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type T2 = T1<User, "id">;//{name: string;age: number;}
type T3 = Partial<User>;//{id?: number;name?: string;age?: number;}
type T4 = Simplify<T2 & T3>;//{id?: number;name: string;age: number;}
```

##### RequiredByKeys\<T,K>

>用于把对象类型中指定的 keys 变成必须的

```typescript
type User = {
  id?: number;
  name?: string;
  age?: number;
};
type Simplify<T> = {
  [P in keyof T]: T[P];
};
type RequiredByKeys<T, K extends keyof T> = Simplify<
  Required<T> & Pick<T, Exclude<keyof T, K>>
>;
type t1 = Required<User>;
type t2 = RequiredByKeys<User, "id" | "name">;
```











