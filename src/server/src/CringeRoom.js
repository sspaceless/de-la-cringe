import { Room } from 'colyseus';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

class CringeRoom extends Room {
  LOBBY_CHANNEL = '$mylobby';

  // eslint-disable-next-line class-methods-use-this
  generateRoomIdSingle() {
    let result = '';
    for (let i = 0; i < 4; i += 1) {
      result += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    }
    return result;
  }

  async generateRoomId() {
    const currentIds = await this.presence.smembers(this.LOBBY_CHANNEL);
    let id;
    do {
      id = this.generateRoomIdSingle();
    } while (currentIds.includes(id));

    await this.presence.sadd(this.LOBBY_CHANNEL, id);
    return id;
  }

  async onCreate() {
    this.roomId = await this.generateRoomId();
  }

  async onDispose() {
    this.presence.srem(this.LOBBY_CHANNEL, this.roomId);
  }
}

export default CringeRoom;
