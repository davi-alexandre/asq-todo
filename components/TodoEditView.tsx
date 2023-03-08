import {useState, useEffect, useRef} from 'react'
import {DocumentData} from 'firebase/firestore';

import { HSep } from "./Separator";
import {db} from '../database/database'
import {doc, updateDoc} from 'firebase/firestore'

type todoProps = {
  todo: DocumentData | null;
  state: {
    activeTodo: DocumentData | null;
    setActiveTodo: (todo: DocumentData) => void;
  };
};
export default function TodoEditView({ todo, state }: todoProps)
{
  const [title, setTitle] = useState<string>(todo?.title ?? "");
  const [content, setContent] = useState<string>(todo?.content ?? "");

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setContent(e.target.value);
    contentRef.current?.setAttribute("style", "height: 0px");
  };
  const onDiscardChanges = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTitle(todo!.title)
    setContent(todo!.content)
  }
  const onSaveChanges = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const document = doc(db, 'todos', todo!.id)
    state.setActiveTodo({...todo, title:title, content:content})
    await updateDoc(document, {title: title, content: content})
      .catch(() => alert("Falha em salvar as alterações"))
  }

  const contentRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const maxScrollHeight = 500;
    const minScrollHeight = 300;
    const scrollHeight = Math.max(minScrollHeight,
      Math.min(contentRef.current?.scrollHeight ?? 0, maxScrollHeight));
    contentRef.current?.setAttribute(
      "style",
      (`height:${scrollHeight}px;`) + 
      (scrollHeight >= maxScrollHeight ? '' : 'overflow-y:hidden')
    );
  }, [content]);

  const isDisabled = title === todo?.title && content === todo?.content;
  return (
    <div className="flex min-h-full flex-col p-1">
      {todo ? (
        <form>
          <input
            type="text"
            value={title}
            className="w-full px-2 text-xl"
            placeholder="Adicionar título da nota"
            onChange={onTitleChange}
            maxLength={65}
          />
          <HSep className="mb-2" />
          <textarea
            ref={contentRef}
            value={content}
            placeholder="Adicionar conteúdo da nota"
            className="w-full resize-none break-words px-2 text-lg"
            onChange={onContentChange}
            maxLength={1000}
          />
          <button
            onClick={onSaveChanges}
            disabled={isDisabled}
            className={
              "float-right mt-1 mb-3 mr-3 block bg-orange-200 py-1 px-2" +
              " " +
              ((isDisabled || title.length === 0) && "hidden")
            }
          >
            Salvar
          </button>
          <button
            onClick={onDiscardChanges}
            className={
              "float-right mt-1 mb-3 mr-3 block bg-orange-200 py-1 px-2" +
              " " +
              (isDisabled && "hidden")
            }
          >
            Descartar mudanças
          </button>
        </form>
      ) : (
        <p>
          <i className="text-slate-400">Selecione uma tarefa</i>
        </p>
      )}
    </div>
  );
}