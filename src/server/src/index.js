/* eslint-disable import/extensions */
import { Server } from 'colyseus';
import { createServer } from 'http';
import express from 'express';
import * as constants from './config.js';
import TaolRoom from './rooms/taol-game/TaolRoom.js';
import CrocodileRoom from './rooms/crocodile-game/CrocodileRoom.js';
import MyGame from './rooms/my-game/MyGame.js';

const port = 2567;

const app = express();
app.use(express.json());

const gameServer = new Server({ server: createServer(app) });

gameServer.listen(port);
gameServer.define(constants.TAOL_ID, TaolRoom);
gameServer.define(constants.CROCODILE_ID, CrocodileRoom);
