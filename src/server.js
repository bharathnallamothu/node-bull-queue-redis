import 'dotenv/config';

import express from 'express';
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');

import routes from './routes';
import mailQueue from './lib/Queue';

const app = express();

app.use(express.json())
app.use(routes);
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues: [new BullAdapter(mailQueue)],
    serverAdapter: serverAdapter,
  });
  app.use('/admin/queues', serverAdapter.getRouter());

app.listen(3333, () => {
    console.log('Server is running on localhost:3333');
});
