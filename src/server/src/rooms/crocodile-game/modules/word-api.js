import fetch from 'node-fetch';
import translate from 'translate-google';
import { WORD_API_URL } from '../config.js';

const getRandomWord = async () => {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a405bf36b3msh45e51cd664d3fcap16e5c1jsna83a02fe0de4',
      'X-RapidAPI-Host': 'pictionary-charades-word-generator.p.rapidapi.com',
    },
  };

  const translateOptions = { from: 'en', to: 'uk' };

  try {
    const response = await fetch(WORD_API_URL, fetchOptions);
    if (!response.ok) {
      throw new Error('something went wrong');
    }
    const result = await response.json();
    const { word } = result;
    const translatedWord = await translate(word, translateOptions);
    return translatedWord;
  } catch (e) {
    console.log(e);
  }
  return undefined;
};

export default getRandomWord;
