import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {type: String, required: true },
    author: {type: String, required: true},
    isbn: {type: String, required: true, unique: true },
    description: {type: Array, required: true},
    image: {type: Array, required: true },
    category: {type: String, required: true },
    publisher: {type: String, required: true },
    publishedYear: {type: Number, required: true },
    totalCopies: {type: Number, required: true, default: 1 },
    availableCopies: {type: Number, required: true, default: 1 },
    isAvailable: {type: Boolean, default: true },
}, { timestamps: true})

const Book = mongoose.models.book || mongoose.model('book', bookSchema)

export default Book