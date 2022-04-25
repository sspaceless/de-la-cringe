import { Room } from 'colyseus';
import Player from './schema/taol-schemas/PlayerSchema.js';
import TaolRoomState from './schema/taol-schemas/TaolRoomState.js';

class TaolRoom extends Room {
  onCreate() {
    this.setState(new TaolRoomState());
    this.maxClients = 8;
    this.onMessage('stage', (client, message) => {
      this.state.stage = message.stage;
      console.log(message.stage);
    });
  }

  onJoin(client, options) {
    const { userName: name, isVip } = options;
    const player = new Player(client.sessionId, name, isVip);

    this.state.players.push(player);
    console.log(client.sessionId, 'joined!');
  }

  onLeave(client) {
    const leavingPlayer = this.state.players.find((player) => player.id === client.sessionId);
    this.state.players.splice(this.state.players.indexOf(leavingPlayer), 1);

    if (leavingPlayer.isVip) {
      this.state.players[0].isVip = true;
    }

    console.log(client.sessionId, 'left!');
  }

  onDispose() {
    console.log('room', this.roomId, 'disposing...');
  }
}

export default TaolRoom;
