/* eslint-disable class-methods-use-this */
import { Room } from 'colyseus';
import { Game1RoomState } from './schema/Game1RoomState';

class Game1Room extends Room {
  onCreate() {
    this.setState(new Game1RoomState());
    this.onMessage('type', () => {
    });
  }

  onJoin(client) {
    console.log(client.sessionId, 'joined!');
  }

  onLeave(client) {
    console.log(client.sessionId, 'left!');
  }

  onDispose() {
    console.log('room', this.roomId, 'disposing...');
  }
}

export default { Game1Room };
