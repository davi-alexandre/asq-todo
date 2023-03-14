import type { SharingGroup } from './SharingGroup'

export default class User {
  constructor(
    readonly uid: string,
    readonly email: string,
    photoUrl: string,
    private connections: User[],
    private groups: SharingGroup[]
  ) {
    this.getConnections = this.getConnections.bind(this);
    this.getGroups = this.getGroups.bind(this);
  }
  getConnections() {
    return this.connections;
  }
  getGroups() {
    return this.groups;
  }
}

export type { User }