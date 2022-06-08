import * as schema from '@colyseus/schema';

const { Schema } = schema;

class MessageState extends Schema {
  constructor(message, sender) {
    super();
    this.messageText = message;
    this.senderId = sender;
    this.sendingDate = new Date().toISOString();
  }
}

schema.defineTypes(MessageState, {
  messageText: 'string',
  senderId: 'string',
  sendingDate: 'string'
});

export default MessageState;
