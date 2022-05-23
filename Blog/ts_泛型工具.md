#### 泛型工具

##### Partial\<T>

此工具的作用就是将泛型中全部属性变为可选的

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

```typescript
type Pick<T,K extends keyof T> ={
  [P in K]: T[P]
}
```