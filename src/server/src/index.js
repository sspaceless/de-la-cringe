import { Server } from 'colyseus';
import { createServer } from 'http';
import express from 'express';
import TaolRoom from './rooms/TaolRoom';

const port = Number(process.env.port) || 3000;

const app = express();
app.use(express.json());

const gameServer = new Server({ server: createServer(app) });

gameServer.listen(port);

gameServer.define('taol', TaolRoom);
