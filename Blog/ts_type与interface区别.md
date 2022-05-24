### type与interface区别

##### 共同点

1. 类型别名和接口都可以来描述对象或函数

   `类型别名`

   ```typescript
   type Person = {
     name: string;
     age: number;
   };
   type getName = (person: Person) => string;
   ```

   `接口`

   ```typescript
     interface Person {
       name: string;
       age: number;
     }
     interface getName {
       (person: Person): string;
     }
   ```

2. 类型别名和接口都支持拓展

   `类型别名使用&(交叉运算符)来拓展；`

   `接口使用extends来拓展`

   ```typescript
   type Animal = {
     name: string
   }
   
   type Bear = Animal & { 
     honey: boolean 
   }
   ```

   ```typescript
   interface Animal {
     name: string
   }
   
   interface Bear extends Animal {
     honey: boolean
   }
   ```

   此外，接口可以通过extends来扩展类型别名定义的类型

   ```typescript
   type Animal = {
     name: string
   }
   
   interface Bear extends Animal {
     honey: boolean
   }
   ```

   类型别名也可以通过`&(交叉运算符)`来拓展已定义的接口类型

   ```typescript
   interface Animal {
     name: string
   }
   
   type Bear = Animal & { 
     honey: boolean 
   }
   ```

#####	 区别

1. 类型别名可以为基本类型、联合类型、或元祖类型定义别名，而接口不行

   ```typescript
   type MyNumber = number;
   type StringOrNumber = string | number;
   type Point = [number, number];
   ```

2. 同名接口会自动合并，而类型别名并不会

   同名接口自动合并

   ```typescript
   interface Person {
     name: string;
   }
   interface Person {
     age: number;
   }
   const user: Person = {
     name: "gzx",
     age: 16,
   };
   ```

   类型别名会冲突报错

   ```typescript
     type Person = {
       name: string;
     };
   //标识符“Person”重复
     type Person = {
       age: number;
     };
   ```

##### 总结

使用`类型别名`的场景

- 定义基本类型的别名
- 定义元祖类型时
- 定义函数类型时
- 定义联合联合时
- 定义映射类型时

使用`接口`的场景

- 需要有类型合并场景时，可使用interface
- 定义对象或者函数类型时，可使用interface

>拓展：
>
>因为interface有类型自动合并的特性，在使用第三方库时，可通过拓展定义一些接口类型，使得工具可以推断出不同的类型

```typescript
import { ProtocolWithReturn } from 'webext-bridge'

declare module 'webext-bridge' {
  export interface ProtocolMap {
    foo: { title: string }
    bar: ProtocolWithReturn<CustomDataType, CustomReturnType>
  }
}
```

```typescript
import { onMessage } from 'webext-bridge'

onMessage('foo', ({ data }) => {
  // type of `data` will be `{ title: string }`
  console.log(data.title)
}
```





































