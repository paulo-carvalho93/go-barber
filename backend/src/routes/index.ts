import { Router } from 'express';
import appontimentsRouter from './appointaments.routes';

const routes = Router();

routes.use('/appointments', appontimentsRouter);

export default routes;
