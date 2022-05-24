#### 类型

##### unknown

`unknown`是指`不可预先定义的类型。`

通常可以简单理解为:`有对应类型，但是暂时不知道是什么类型。一般需要as`

很多场景下，它可以替代 any 的功能同时保留静态检查的能力。

```typescript
const num: number = 10;
(num as unknown as string).split('');  	// 注意，这里和any一样完全可以通过静态检查
```

这个时候 unknown 的作用就跟 any 高度类似了，你可以把它转化成任何类型，不同的地方是，在静态编译的时候，unknown 不能调用任何方法，而 any 可以。

```typescript
const foo: unknown = 'string';
foo.substr(1);   	// Error: 静态检查不通过报错
const bar: any = 10;
any.substr(1);		// Pass: any类型相当于放弃了静态检查
```

##### never

never是指没法正常结果结果而返回的类型，一个必定是报错或者死循环的函数返回的类型。

```typescript
function foo(): never { throw new Error('error message') }  // throw error 返回值是never
function foo(): never { while(true){} }  // 这个死循环的也会无法正常退出
function foo(): never { let count = 1; while(count){ count ++; } }  // Error: 这个无法将返回值定义为never，因为无法在静态编译阶段直接识别出
```

1. 永远不相交的类型，结果会为never

```typescript
type human = 'boy' & 'girl' // 这两个单独的字符串类型并不可能相交，故human为never类型
```

2. 任何类型`联合`never类型，还是原类型

```typescript
type language = 'ts' | never   // language的类型还是'ts'类型
```

特性:

- 在一个函数中调用了返回 never 的函数后，之后的代码都会变成`deadcode`

  ```typescript
  function foo(): never { throw new Error('error message') } 
  function test() {
    foo();  		// 这里的foo指上面返回never的函数
    console.log(111); 	// Error: 编译器报错，此行代码永远不会执行到
  }
  ```

- 无法把其他类型赋给never

  ```typescript
  let n: never;
  let o: any = {};
  n = o;  // Error: 不能把一个非never类型赋值给never类型，包括any
  ```

#### 运算符

##### 非空断言运算符！

这个运算符可以用在变量名或者函数名之后，用来强调对应的元素是非 null ｜undefined 的

```typescript
function onClick(callback?: () => void) {
  callback!();		// 参数是可选入参，加了这个感叹号!之后，TS编译不报错
}
```

你可以查看编译后的 ES5 代码，居然没有做任何防空判断。

```typescript
function onClick(callback) {
  callback();
}
```

这个符号的场景，特别适用于我们已经明确知道不会返回空值的场景，从而减少冗余的代码判断，如 React 的 Ref。

```typescript
function Demo(): JSX.Elememt {
  const divRef = useRef<HTMLDivElement>();
  useEffect(() => {
    divRef.current!.scrollIntoView();	 // 当组件Mount后才会触发useEffect，故current一定是有值的
  }, []);
  return <div ref={divRef}>Demo</div>
}
```

##### 可选链运算符 ?.

相比上面!作用于编译阶段的非空判断，`?.`这个是开发者最需要的运行时(当然编译时也有效)的非空判断。

```typescript
obj?.prop    obj?.[index]    func?.(args)
```

?.用来判断左侧的表达式是否是 null | undefined，如果是则会停止表达式运行，可以减少我们大量的&&运算。

比如我们写出`a?.b`时，编译器会自动生成如下代码

```typescript
a === null || a === void 0 ? void 0 : a.b;
```

这里涉及到一个小知识点:`undefined`这个值在非严格模式下会被重新赋值，使用`void 0`必定返回真正的 undefined。

##### 空值合并运算符 ??

??与||的功能是相似的，区别在于 **??在左侧表达式结果为 null 或者 undefined 时，才会返回右侧表达式** 。

比如我们书写了`let b = a ?? 10`，生成的代码如下：

```typescript
let b = a !== null && a !== void 0 ? a : 10;
```

而 || 表达式，大家知道的，则对 false、''、NaN、0 等逻辑空值也会生效，不适于我们做对参数的合并。

##### 数字分隔符_

```typescript
let num:number = 1_2_345.6_78_9
```

_可以用来对长数字做任意的分隔，主要设计是为了便于数字的阅读，编译出来的代码是没有下划线的，请放心食用。

#### 操作符

##### 键值获取 keyof

keyof 可以获取一个类型所有键值，返回一个联合类型，如下：

```typescript
type Person = {
  name: string;
  age: number;
}
type PersonKey = keyof Person;  // PersonKey得到的类型为 'name' | 'age'
```

keyof 的一个典型用途是限制访问对象的 key 合法化，因为 any 做索引是不被接受的。

```typescript
function getValue (p: Person, k: keyof Person) {
  return p[k];  // 如果k不如此定义，则无法以p[k]的代码格式通过编译
}
```

总结起来 keyof 的语法格式如下

```
类型 = keyof 类型
```

##### 实例类型获取 typeof

typeof是获取一个`对象/实例`的类型

```typescript
const me: Person = { name: 'gzx', age: 16 };
type P = typeof me;  // { name: string, age: number | undefined }
const you: typeof me = { name: 'mabaoguo', age: 69 }  // 可以通过编译
```

typeof 只能用在具体的对象上，这与 js 中的 typeof 是一致的，并且它会根据左侧值自动决定应该执行哪种行为。

```typescript
const typestr = typeof me;   // typestr的值为"object"
```

typeof 可以和 keyof 一起使用(因为 typeof 是返回一个类型嘛)，如下：

```typescript
type PersonKey = keyof typeof me;   // 'name' | 'age'
```

总结起来 typeof 的语法格式如下：

```
类型 = typeof 实例对象
```

##### 遍历属性in

`in`只能用在类型的定义中，可以对枚举类型进行便利

可以把如下方式，抽象为类型构造的一个构造函数。

```typescript
// 这个类型可以将任何类型的键值转化成number类型
type TypeToNumber<T> = {
  [key in keyof T]: number
}
```

`keyof`返回泛型 T 的所有键枚举类型，`key`是自定义的任何变量名，中间用`in`链接，外围用`[]`包裹起来(这个是固定搭配)，冒号右侧`number`将所有的`key`定义为`number`类型。

于是可以这样使用了：

```typescript
const obj: TypeToNumber<Person> = { name: 10, age: 10 }
```

总结起来 in 的语法格式如下：

```
[ 自定义变量名 in 枚举类型 ]: 类型
```

































