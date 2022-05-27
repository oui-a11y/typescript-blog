### keyof

获取对象类型中的键，就需要使用 keyof 操作符。该操作符是在 TypeScript 2.1 版本中引入的，用于获取某种类型中的所有键，其返回类型是`联合类型`。

```typescript
type User = {
  id: number;
  name: string;
}

type UserKeys = keyof User; // "id" | "name"
```

在获取对象类型的键之后，我们就可以通过类似属性访问的语法来访问该键对应的值的类型。

```typescript
type U1 = User["id"] // number
type U2 = User["id" | "name"] // string | number
type U3 = User[keyof User] // string | number
```

```typescript
function getProperty<T extends object, K extends keyof T>(
  obj: T, key: K
) {
  return obj[key];
}
```

