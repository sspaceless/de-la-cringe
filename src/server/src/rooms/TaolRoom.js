import { Room } from 'colyseus';
import Player from './schema/taol-schemas/PlayerSchema.js';
import TaolRoomState from './schema/taol-schemas/TaolRoomState.js';

class TaolRoom extends Room {
  onCreate() {
    this.setState(new TaolRoomState());
    this.onMessage('type', () => {
    });
  }

  onJoin(client, options) {
    const { userName: name, isVip } = options;
    const player = new Player(client.sessionId, name, isVip);

    this.state.players.push(player);
    console.log(client.sessionId, 'joined!');
  }

  onLeave(client) {
    const playerFilter = (player) => player.id !== client.sessionId;
    this.state.players = this.state.players.filter(playerFilter);
    console.log(client.sessionId, 'left!');
  }

  onDispose() {
    console.log('room', this.roomId, 'disposing...');
  }
}

export default TaolRoom;
