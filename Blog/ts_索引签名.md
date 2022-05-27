### 索引签名

>索引签名的语法：`{ [key: KeyType]: ValueType }`
>
>其中 Key 的类型，只能是 string，number，symbol 或模版字面量类型，而值的类型可以是任意类型。



模版字面量类型是 TypeScript 4.1 版本引入的新类型，结合索引签名我们可以定义更强大的类型：

```typescript
interface PropChangeHandler {
  [key: `${string}Changed`]: () => void;
}

let handlers: PropChangeHandler = {
  idChanged: () => {}, // Ok
  nameChanged: () => {}, // Ok
  ageChange: () => {} // Error
};
```

---

在使用索引签名时，你可能会遇到这些困惑：

```typescript
interface NumbersNames {
  [key: string]: string
}

const names: NumbersNames = {
  '1': 'one',
  '2': 'two',
  '3': 'three'
};

const value1 = names['1'] // Ok
const value2 = names[1] // Ok

type N0 = keyof NumbersNames // string ｜ number
```

**这是因为当用作属性访问器中的键时，JavaScript 会隐式地将数字强制转换为字符串，TypeScript 也会执行这种转换。**

除了使用索引签名之外，我们还可以使用 TS 内置的工具类型 **Record** 类型来定义

```typescript
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

function calculateSalary(salaryObject: Record<string, number>) {
  let total = 0;
  for (const name in salaryObject) {
    total += salaryObject[name];
  }
  return total;
}
```

对于索引签名来说，其键的类型，只能是 string，number，symbol 或模版字面量类型。而 Record 工具类型，键的类型可以是字面量类型或字面量类型组成的**联合类型**：

```typescript
type User1 = {
  [key: "id"]: string; // Error
};

type User2 = {
  [key: "id" | "name"]: string; // Error
};

type User3 = Record<"id", string>; // Ok
type User4 = Record<"id" | "name", string>; // Ok

const user: User4 = {
  id: "01",
  name: "test",
};
```











