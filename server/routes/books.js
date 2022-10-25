import express from "express";
import { getBooks } from "../controllers/books.js";
import { createBook } from "../controllers/books.js";
import { updateBook } from "../controllers/books.js";
import { deleteBook } from "../controllers/books.js";

const router = express.Router();

router.get('/', getBooks);
router.post('/', createBook);
router.patch('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;