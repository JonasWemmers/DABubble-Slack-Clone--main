export class Channel {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  // public toJSON() {
  //   return {
  //     id: this.id,
  //     name: this.name,
  //   };
  // }
}