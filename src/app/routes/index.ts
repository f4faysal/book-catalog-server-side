import express from 'express';
import { UserRoutes } from '../modules/user/book.route';

const router = express.Router();

const moduleRutes = [
  {
    path: '/',
    route: UserRoutes,
  }
];

moduleRutes.forEach(route => router.use(route.path, route.route));
export default router;
