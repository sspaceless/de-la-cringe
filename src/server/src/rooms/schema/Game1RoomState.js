import * as schema from "@colyseus/schema";

export class Game1RoomState extends schema.Schema {
  constructor() {
    super();
    this.mySynchronizedProperty = "Hello world";
  }
}

schema.defineTypes(Game1RoomState, {
  mySynchronizedProperty: "string",
});
