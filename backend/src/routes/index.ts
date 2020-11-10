import { Router } from 'express';
import appontimentsRouter from './appointaments.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/appointments', appontimentsRouter);
routes.use('/users', usersRouter);

export default routes;
