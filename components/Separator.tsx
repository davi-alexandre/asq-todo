export function VSep({ className }: any) {
  return (
    <div
      className={'w-0 border-r-[1px] bg-blend-darken mx-1' + ' ' + className}
    />
  )
}

export function HSep({ className }: any) {
  return (
    <div className={"h-0 border-t-[1px] bg-blend-darken my-1" + " " + className} />
  );
}
