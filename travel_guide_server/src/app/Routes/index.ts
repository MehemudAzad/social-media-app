import { Router } from 'express';
import { CarRoutes } from '../module/car/car.route';
import { BookingRoutes } from '../module/booking/booking.routes';
import { UserRoutes } from '../module/user/user.route';
import { AuthRoutes } from '../module/Auth/auth.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/cars',
    route: CarRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
