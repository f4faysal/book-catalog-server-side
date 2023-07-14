import express from 'express';
import { BookRoutes } from '../modules/user/book.route';

const router = express.Router();

const moduleRutes = [
  {
    path: '/book',
    route: BookRoutes,
  }
];

moduleRutes.forEach(route => router.use(route.path, route.route));
export default router;
