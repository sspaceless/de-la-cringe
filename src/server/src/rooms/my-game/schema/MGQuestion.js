import * as schema from '@colyseus/schema';

class MGQuestion extends schema.Schema {
  constructor(text, theme, price) {
    super();

    this.text = text;
    this.theme = theme;
    this.price = price;
    this.fileDuration = 0;
  }

  addFile(fileUrl, fileType, fileDuration) {
    this.fileUrl = fileUrl;
    this.fileType = fileType;
    this.fileDuration = fileDuration;
  }
}

schema.defineTypes(MGQuestion, {
  text: 'string',
  price: 'number',
  theme: 'string',
  answeredUserId: 'string',
  answer: 'string',
  fileUrl: 'string',
  fileType: 'string',
  fileDuration: 'number'
});

export default MGQuestion;
