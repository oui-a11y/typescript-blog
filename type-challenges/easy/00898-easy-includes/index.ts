{
  type isPillarMen = Includes1<
    ["Kars", "Esidisi", "Wamuu", "Santana"],
    "Esidisi"
  >; // expected to be `false`

  type Includes1<T extends readonly any[], U> = T extends [
    infer F,
    ...infer Rest
  ]
    ? F extends U
      ? true
      : Includes1<Rest, U>
    : false;
  //github recommended
  type IsEqual<T, U> = (<G>() => G extends T ? 1 : 2) extends <
    G
  >() => G extends U ? 1 : 2
    ? true
    : false;
  type Includes2<T extends readonly any[], U> = IsEqual<T[0], U> extends true
    ? true
    : T extends [T[0], ...infer Rest]
    ? Includes2<Rest, U>
    : false;
  type isPillarMen2 = Includes2<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">; // expected to be `false`
  type isPillarMen3 = Includes2<
    ["Kars", "Esidisi", "Wamuu", "Santana"],
    "Esidisi"
  >; // expected to be `false`
}
