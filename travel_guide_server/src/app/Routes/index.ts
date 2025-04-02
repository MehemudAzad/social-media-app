import { Router } from 'express';
import { UserRoutes } from '../module/User/user.route';
import { AuthRoutes } from '../module/Auth/auth.route';
import { PostRoutes } from '../module/Post/post.route';
import { MeilisearchRoutes } from '../module/Meilisearch/meilisearch.route';
import { CommentRoutes } from '../module/Comment/comment.route';


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
  {
    path: '/comment',
    route: CommentRoutes,
  },
  {
    path: '/search-posts',
    route: MeilisearchRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
