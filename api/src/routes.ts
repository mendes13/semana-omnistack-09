import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import SpotController from './app/controllers/SpotController';
import DashboardController from './app/controllers/DashboardController';
import BookingController from './app/controllers/BookingController';
import ApprovalController from './app/controllers/ApprovalController';
import RejectionController from './app/controllers/RejectionController';

const routes = Router();

const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboard', DashboardController.index);

routes.post('/bookings', BookingController.store);
routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);

export default routes;
