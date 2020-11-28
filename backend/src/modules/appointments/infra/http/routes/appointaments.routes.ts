import { Router } from 'express';

import ensuredAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentController();

appointmentsRouter.use(ensuredAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
