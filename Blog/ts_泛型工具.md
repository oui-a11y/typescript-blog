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

