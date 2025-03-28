import { Router } from 'express';
import { UserRoutes } from '../module/User/user.route';
import { AuthRoutes } from '../module/Auth/auth.route';
import { PostRoutes } from '../module/Post/post.route';


const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/post',
    route: PostRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
