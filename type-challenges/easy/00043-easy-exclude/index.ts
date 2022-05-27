{
  type Exclude1<T, U> = T extends U ? never : T;

  type t1 = Exclude1<"a" | "b" | "c", "b" | "c">;
}
