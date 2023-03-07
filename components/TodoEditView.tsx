import {useState, useEffect, useRef} from 'react'
import { DocumentData } from 'firebase/firestore';

type todoProps = {
  todo: DocumentData | null
} 
export default function TodoEditView({ todo }: todoProps)
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
  };

  const contentRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    contentRef.current?.setAttribute("style", "height: 0px");
    contentRef.current?.setAttribute(
      "style",
      "height:" +
        contentRef.current?.scrollHeight.toString() +
        "px; overflow-y:hidden"
    );
  }, [content]);

  const isDisabled = title === todo?.title && content === todo?.content;
  return (
    <div className="min-h-full py-3 px-4">
      {todo ? (
        <form>
          <input
            type="text"
            value={title}
            className="w-full text-xl"
            placeholder="Adicionar título da nota"
            onChange={onTitleChange}
            maxLength={65}
          />
          <hr className="my-1 mb-2" />
          <textarea
            ref={contentRef}
            value={content}
            placeholder="Adicionar conteúdo da nota"
            className="w-full resize-none break-words text-lg focus:outline-1"
            onChange={onContentChange}
            maxLength={1000}
          />
          <button
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