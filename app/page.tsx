'use client'

import { useEffect, useState, useRef } from 'react';
import TodoListing from '../components/TodoListing'
import TodoEditView from '../components/TodoEditView'
import { DocumentData } from 'firebase/firestore';


export default function App() {
  const [activeTodo, setActiveTodo] = useState<DocumentData | null>(null)
  return ( // align-items: flex-start == perpendicular == items-start
    <>
      <div className="m-2 flex rounded-md">
        <TodoListing state={{ activeTodo, setActiveTodo }} className="flex-1" />
        <div className="flex-1">
          <TodoEditView key={activeTodo?.id} todo={activeTodo} />
        </div>
      </div>
    </>
  );
}