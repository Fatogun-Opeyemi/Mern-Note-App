import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, //name of model},
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishYear: { type: Number, required: true },
  },
  { timestamps: true },
);
const Book = mongoose.model('BookModel', bookSchema);

export default Book;
