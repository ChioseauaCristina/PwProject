import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    author: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const BookMessage = mongoose.model('BookMessage', bookSchema);

export default BookMessage;