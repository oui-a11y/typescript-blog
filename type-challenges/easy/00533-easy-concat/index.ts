{
  type Result = Concat<[1], [2]> // expected to be [1, 2]
  
  type Concat<T extends unknown[] ,U extends unknown[]> = [...T,...U]

}