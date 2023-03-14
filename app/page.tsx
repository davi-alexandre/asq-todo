'use client'
import React, {useState, useEffect, useCallback} from 'react'




class Todo {
  title: string;
  description: string;
  constructor(descript: string) {
    this.title = 'some title'
    this.description = descript
  }
}


function useTodo(init?: Todo) {
  // custom hook to copy the current todo
  const [todo, setTodo] = useState<Todo>(init ?? new Todo(""));
  const updateTodo = () => {
    const next = new Todo("");
    next.title = todo.title;
    next.description = todo.description;
    setTodo(next);
  };
  // {} ao invés de [] pra exigir os nomes
  return { todo, updateTodo } as const;
}


export default function Home() {
  const {todo, updateTodo} = useTodo()
  return (
    <div
      className='hover:cursor-pointer'
      onClick={() => {
        todo.title = "new title";
        todo.description = 'new description';
        updateTodo()
      }}
    >
      <p>{todo.title}</p>
      <p>{todo.description}</p>
    </div>
  );
}