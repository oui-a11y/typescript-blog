{
  type MyParameters<T extends (...args: any[]) => any> = T extends (
    ...args: infer V
  ) => any
    ? V
    : never;
}
