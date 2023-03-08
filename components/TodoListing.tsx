import { useState, useEffect, useRef } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { db } from "../database/database";
import {
  query,
  collection,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";


const q = query(collection(db, "todos"));


export default function TodoList({ className, state }: any) {
  const [todos, setTodos] = useState<DocumentData[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todos = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(todos);
    });
    return unsubscribe;
  }, []);

  return (
    <div className={className + " " + "flex flex-col max-h-[600px] overflow-y-scroll"}>
      {todos.length > 0
        ? todos.map((todo) => (
            <TodoListItem key={todo.id} todo={todo} state={state} />
          ))
        : "loading..."}
    </div>
  );
}


type todoProps = {
  todo: DocumentData | null;
  state?: {
    activeTodo: DocumentData | null;
    setActiveTodo: (todo: DocumentData) => void;
  };
};


function TodoListItem({ todo, state }: todoProps) {
  const [isChecked, setCheck] = useState(false);
  const toggleCheck = (e: React.MouseEvent) => {
    e.stopPropagation(); // impedir setActive, evento do parente
    setCheck(!isChecked);
  };
  const setActive = () => {
    state && state.setActiveTodo(todo!);
  };
  return (
    <li
      className={
        "flex flex-col justify-center list-none py-2 px-4 h-12" + " " +
        (todo?.id === state?.activeTodo?.id ? "text-orange-900 bg-orange-200" : "text-gray-900")
      }
      onClick={setActive}
    >
      <div className="flex items-center">
        <div
          className="mr-4 flex select-none items-center"
          onClick={toggleCheck}
        >
          <p className="text-lg">
            {isChecked ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
          </p>
        </div>
        <p className="text-base">{todo?.title}</p>
      </div>
    </li>
  );
}
