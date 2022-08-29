import { Router } from 'express';

import MailController from './controllers/MailController';

const routes = Router();

routes.post('/mail', MailController.store);

export default routes;