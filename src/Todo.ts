import _ from 'lodash'
import {Node} from 'slate'
import User from './User'
import SharingGroup from './SharingGroup'
import ActivityRecord from './Stats'


const enum TodoPriority {
  NONE, LOW, MEDIUM, HIGH
}

type DailyProgression = Readonly<{
  goalCount?: number,
  goalTimeLength?: number,
}>


/** prazo de validade Data a Data */
export class ExistenceTimespan {
  constructor(
    public readonly start: Date | null,
    public readonly end: Date | null
  ) {
    if (this.start && this.end && this.start > this.end)
      throw new Error("A data inicial não pode ser anterior à do fim");      
    this.isTimeOut = this.isTimeOut.bind(this)
  }
  isTimeOut() {
    if (!this.end) return false;
    return new Date() > this.end;
  }
}


type ITodo = (
  Required<
  {
    readonly id: string;
    title: string;        // property, not field
    children: Todo[];
    priority: TodoPriority;
    progression: DailyProgression;
    weekDays: number[];
  }> &
  Partial<
  {
    description: Node;
    readonly owner: User;
    stats: ActivityRecord;
    timespan: ExistenceTimespan;
    icon: JSX.Element;
    parent: Todo;
    group: SharingGroup;
  }>
);

class Todo implements ITodo
{
  // ITodo
  public readonly id!: string;
  private _title!: string;
  children: Todo[] = [];
  priority: TodoPriority = TodoPriority.NONE;
  progression: DailyProgression = {};
  weekDays: number[] = [];

  description?: Node;
  readonly owner?: User;
  stats?: ActivityRecord;
  timespan?: ExistenceTimespan;
  icon?: JSX.Element;
  parent?: Todo;
  group?: SharingGroup;

  constructor(params: ITodo) {
    Object.assign(this, params)
  }

  get title() { return this._title }
  set title(value: string) {
    this._title = value.trim()
  }

  saveToFirebase(): void {
    throw new Error("not implemented");
  }

  share(user: User): void;
  share(user?: User, group?: SharingGroup): void
  {
    throw new Error("not implemented");
  }
  
  copy() {
    return new Todo(this as ITodo)
  }
}


export type { Todo, TodoPriority, DailyProgression };
export default Todo