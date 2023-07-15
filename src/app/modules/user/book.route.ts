import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.post('/', BookController.createBook);
router.get('/', BookController.getallBook);
router.post('/review/:id', BookController.createReview);
router.get('/review/:id', BookController.getaReview);
router.get('/:id', BookController.getSingelBook);
router.patch('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);

export const BookRoutes = router;
