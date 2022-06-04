import { WORD_API_URL } from '../config.js';

const getRandomWord = async () => {
  try {
    const response = await fetch(WORD_API_URL);
    if (!response.ok) {
      throw new Error('something went wrong');
    }
    const result = await response.json();
    const { word } = result[0];
    return word;
  } catch (e) {
    console.log(e);
  }
  return undefined;
};

export default getRandomWord;
