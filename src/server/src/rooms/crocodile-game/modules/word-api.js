import fetch from 'node-fetch';
import translate from 'translate-google';
import { WORD_API_URL } from '../config.js';

const getRandomWord = async () => {
  const translateOptions = { from: 'en', to: 'uk' };

  try {
    const response = await fetch(WORD_API_URL);
    if (!response.ok) {
      throw new Error('something went wrong');
    }
    const result = await response.json();
    const { Word: word } = result[0];
    const translatedWord = await translate(`a ${word}`, translateOptions);
    return translatedWord;
  } catch (e) {
    console.log(e);
  }
  return undefined;
};

export default getRandomWord;
