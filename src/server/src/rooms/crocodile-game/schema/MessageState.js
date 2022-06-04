import * as schema from '@colyseus/schema';

const { Schema } = schema;

class MessageState extends Schema {
  constructor(message, sender) {
    super();
    this.message = message;
    this.sender = sender;
  }
}

schema.defineTypes(MessageState, {
  message: 'string',
  sender: 'string'
});

export default MessageState;
