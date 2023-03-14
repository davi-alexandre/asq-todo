import type { Todo } from './Todo'
import type { User } from './User'

export default class SharingGroup {
  constructor(
    readonly id: string,
    name: string,
    icon: JSX.Element,
    private users: User[],
    private topLevelTodos: Todo[]
  ) {
    this.getUsers = this.getUsers.bind(this);
  }
  addUser(user: User) {
    if (!(user.uid in this.users)) this.users.push(user);
  }
  getUsers() {
    return this.users;
  }
  addTodo(todo: Todo) {}
}

export type { SharingGroup }