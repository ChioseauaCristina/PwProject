import express from "express";
import { getBooks } from "../controllers/books.js";
import { createBook } from "../controllers/books.js";
import { updateBook } from "../controllers/books.js";
import { deleteBook } from "../controllers/books.js";
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getBooks);
router.post('/', auth, createBook);
router.patch('/:id', auth, updateBook);
router.delete('/:id', auth, deleteBook);

export default router;