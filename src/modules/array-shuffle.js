const arrayShuffle = (array) => {
  const shuffled = array;
  const arrayLength = shuffled.length;

  for (let i = arrayLength - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

export default arrayShuffle;
