import games from '../games.json';

function completeGamesList(list) {
  let gamesList = games;

  if (list.length > 0) {
    gamesList = gamesList.map((game) => {
      const result = list.find((x) => x.gameId === game.gameId);

      if (result) {
        if (result.type === 'trial') {
          result.untilDate = new Date(result.untilDate);

          if (result.untilDate < new Date()) {
            result.type = 'payable';
          }
        }

        return { ...game, ...result };
      }

      return game;
    });
  }

  return gamesList;
}

// eslint-disable-next-line import/prefer-default-export
export { completeGamesList };
