import { Room } from "@colyseus/core";
import { Game1RoomState } from "./schema/Game1RoomState.js";

export class Game1Room extends Room {

  onCreate (options) {
    this.setState(new Game1RoomState());

    this.onMessage("type", (client, message) => {
    });

  }

  onJoin (client, options) {
    console.log(client.sessionId, "joined!");
  }

  onLeave (client, consented) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
