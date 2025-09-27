import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true },
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true },
    studentId: {type: String, required: true, unique: true},
    phoneNumber: {type: String, required: true},
    address: {type: String, required: false},
    membershipDate: {type: Date, default: Date.now},
    isActive: {type: Boolean, default: true},
    borrowedBooks: [{type: mongoose.Schema.Types.ObjectId, ref: 'borrowing'}],
    totalFines: {type: Number, default: 0},
    maxBooksAllowed: {type: Number, default: 5}
}, {minimize: false})

const User = mongoose.models.user || mongoose.model('user', userSchema)

export default User