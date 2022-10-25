import mongoose from "mongoose";
import BookMessage from "../models/bookMessage.js";

export const getBooks = async (req, res) => {
    try {
        const bookMessages = await BookMessage.find();
        res.status(200).json(bookMessages);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const createBook = async (req, res) => {
    const book = req.body;

    const newBook = new BookMessage(book);
    try {
        await newBook.save();
        res.status(200).json(newBook);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const updateBook = async (req, res) => {
    const { id: _id } = req.params;
    const book = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return  res.status(404).send('No book with that id');


    const updatedBook = await BookMessage.findByIdAndUpdate(_id, {...book, _id}, {new: true});
    res.json(updateBook);
}

export const deleteBook = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return  res.status(404).send('No book with that id');

    await BookMessage.findByIdAndRemove(_id);

    
    res.json({ message: 'Post deleted successfully' });
}