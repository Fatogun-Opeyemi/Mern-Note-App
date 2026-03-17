import express from 'express';

import { protect } from '../middlewares/authMiddleware.js';

import {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from '../Controllers/controllers.js';

const router = express.Router();

// router.route('/')
// router.route('/:id')

router.route('/').get(protect, getAllBooks).post(protect, createBook);
router
  .route('/:id')
  .get(protect, getBook)
  .patch(protect, updateBook)
  .delete(protect, deleteBook);
// router.get('/api/v1/books', getAllBooks);

// router.get('/api/v1/books/:id', getBook);

// router.post('/api/v1/books', createBook);

// router.patch('/api/v1/books/:id', updateBook);

// router.delete('/api/v1/books/:id', deleteBook);

export default router;
