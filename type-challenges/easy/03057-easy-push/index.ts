{
  type Result = Push<[1, 2], '3'> // [1, 2, '3']

  type Push<T extends unknown[],U> = [...T,U]
}