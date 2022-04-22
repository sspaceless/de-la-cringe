/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import { Room } from 'colyseus';
import Player from './schema/PlayerSchema.js';
import TaolRoomState from './schema/TaolRoomState.js';

class TaolRoom extends Room {
  onCreate() {
    this.setState(new TaolRoomState());
    this.onMessage('type', () => {
    });
  }

  onJoin(client, options) {
    this.state.players.add(new Player(client.sessionId, options.name));
    console.log(client.sessionId, 'joined!');
  }

  onLeave(client) {
    console.log(client.sessionId, 'left!');
  }

  onDispose() {
    console.log('room', this.roomId, 'disposing...');
  }
}

export default TaolRoom;
