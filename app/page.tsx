'use client'

import { useEffect, useState, useRef } from 'react';
import TodoListing from '../components/TodoListing'
import TodoEditView from '../components/TodoEditView'
import { VSep, HSep } from '../components/Separator'
import { DocumentData, addDoc, collection, getDoc } from 'firebase/firestore';
import { FaPlus } from 'react-icons/fa'
import { db } from '../database/database'


export default function App() {
  const [activeTodo, setActiveTodo] = useState<DocumentData | null>(null)
  const onCreateTodo = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, 'todos'), {title: '', content: ''});
    const doc = await getDoc(docRef)
    setActiveTodo({...doc.data(), id:doc.id}) // TODO: interface do objeto ToDo
  }
  return (
    // align-items: flex-start == perpendicular == items-start
    <>
      <div className="m-2 flex overflow-hidden rounded-md">
        <div className="flex-1">
          <TodoListing state={{ activeTodo, setActiveTodo }} />
          <button onClick={onCreateTodo} className="float-right my-2 bg-indigo-300 rounded px-2 py-1 text-xl text-white">
            <FaPlus />
          </button>
        </div>
        <VSep />
        <div className="flex-1">
          <TodoEditView
            key={activeTodo?.id}
            todo={activeTodo}
            state={{ activeTodo, setActiveTodo }}
          />
        </div>
      </div>
    </>
  );
}