{
//Promise<ExampleType>

type  Awaited <T> = T extends Promise<infer R> ? R : never

const p1 = new Promise<string>((resolve, reject) => {
  resolve('hello')
})
interface User{
  name: string,
  age: number
}
const p2 = new Promise<User>((resolve, reject) => {
  resolve({
    name:'xin',
    age:18
  })
})

type t1 = Awaited<typeof p1>
type t2 = Awaited<typeof p2>

}