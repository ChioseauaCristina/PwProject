import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    userId: { type: String, required: true},
    bookId: { type: String, required: true},
    title: { type: String},
    quantity: { type: Number},
});

export default mongoose.model("Order", userSchema);