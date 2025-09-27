import mongoose from "mongoose";

const borrowingSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    bookId: {type: mongoose.Schema.Types.ObjectId, ref: 'book', required: true },
    borrowDate: {type: Date, default: Date.now },
    dueDate: {type: Date, required: true },
    returnDate: {type: Date, default: null },
    status: {type: String, enum: ['borrowed', 'returned', 'overdue'], default: 'borrowed' },
    fine: {type: Number, default: 0 },
    renewalCount: {type: Number, default: 0 },
    maxRenewals: {type: Number, default: 2 }
}, { timestamps: true})

// Calculate due date (14 days from borrow date)
borrowingSchema.pre('save', function(next) {
    if (this.isNew && !this.dueDate) {
        this.dueDate = new Date(this.borrowDate.getTime() + (14 * 24 * 60 * 60 * 1000));
    }
    next();
});

const Borrowing = mongoose.models.borrowing || mongoose.model('borrowing', borrowingSchema)

export default Borrowing