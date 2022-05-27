{
  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }

  const todo: MyReadonly2<Todo, "title" | "description"> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  };

  todo.title = "Hello"; // Error: cannot reassign a readonly property
  todo.description = "barFoo"; // Error: cannot reassign a readonly property
  todo.completed = true; // OK

  type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> &
    Readonly<Pick<T, K>>;
}
