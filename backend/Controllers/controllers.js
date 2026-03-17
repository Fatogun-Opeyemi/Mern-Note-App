import Book from '../Models/models.js';
import User from '../Models/userModel.js';
import asyncHandler from 'express-async-handler';

export const getAllBooks = async (req, res) => {
  const books = await Book.find({ user: req.user.id });

  res.status(200).json({
    books,
  });
};

export const getBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).json('Not found');

  res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
};

export const createBook = async (req, res) => {
  const book = await Book.create({
    ...req.body,
    user: req.user.id,
  });

  res.status(201).json({
    status: 'success',
    data: {
      book,
    },
  });
};

export const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).json({ message: 'Book not found' });

  if (book.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ data: { book: updatedBook } });
});

export const deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).json({ message: 'Book not found' });

  if (book.user.toString() !== req.user.id)
    return res.status(401).json({ message: 'Not authorized' });

  await book.deleteOne();

  res.status(204).json();
};
