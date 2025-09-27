import Borrowing from "../models/Borrowing.js"
import Book from "../models/Book.js"
import User from "../models/User.js"

// Borrow Book : /api/borrowing/borrow
export const borrowBook = async (req, res) => {
    try {
        const { bookId } = req.body
        const userId = req.userId || req.body.userId

        console.log('🔍 Borrowing attempt:', { bookId, userId });

        if (!userId) {
            return res.json({ success: false, message: "User authentication required" })
        }

        // Check if book exists and is available
        const book = await Book.findById(bookId)
        if (!book) {
            return res.json({ success: false, message: "Book not found" })
        }

        if (book.availableCopies < 1) {
            return res.json({ success: false, message: "Book is not available" })
        }

        // Check if user has already borrowed this book and not returned
        const existingBorrow = await Borrowing.findOne({ 
            userId, 
            bookId, 
            status: { $in: ['borrowed', 'overdue'] } 
        })
        
        if (existingBorrow) {
            return res.json({ success: false, message: "You have already borrowed this book" })
        }

        // Check user's borrowing limit
        const user = await User.findById(userId)
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        const activeBorrowings = await Borrowing.countDocuments({ 
            userId, 
            status: { $in: ['borrowed', 'overdue'] } 
        })

        const maxBooks = user.maxBooksAllowed || 5 // Default to 5 if not set
        if (activeBorrowings >= maxBooks) {
            return res.json({ 
                success: false, 
                message: `You have reached your borrowing limit of ${maxBooks} books` 
            })
        }

        // Create borrowing record
        const borrowing = new Borrowing({
            userId,
            bookId,
            borrowDate: new Date(),
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
        })

        await borrowing.save()

        // Update book availability
        book.availableCopies -= 1
        if (book.availableCopies === 0) {
            book.isAvailable = false
        }
        await book.save()

        // Update user's borrowed books
        user.borrowedBooks.push(borrowing._id)
        await user.save()

        res.json({ success: true, message: "Book borrowed successfully", borrowing })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Return Book : /api/borrowing/return
export const returnBook = async (req, res) => {
    try {
        const { borrowingId } = req.body
        const userId = req.userId || req.body.userId

        if (!userId) {
            return res.json({ success: false, message: "User authentication required" })
        }

        const borrowing = await Borrowing.findOne({ _id: borrowingId, userId })
        
        if (!borrowing) {
            return res.json({ success: false, message: "Borrowing record not found" })
        }

        if (borrowing.status === 'returned') {
            return res.json({ success: false, message: "Book already returned" })
        }

        // Calculate fine if overdue
        const currentDate = new Date()
        let fine = 0
        
        if (currentDate > borrowing.dueDate) {
            const overdueDays = Math.ceil((currentDate - borrowing.dueDate) / (1000 * 60 * 60 * 24))
            fine = overdueDays * 5 // $5 per day fine
        }

        // Update borrowing record
        borrowing.returnDate = currentDate
        borrowing.status = 'returned'
        borrowing.fine = fine
        await borrowing.save()

        // Update book availability
        const book = await Book.findById(borrowing.bookId)
        book.availableCopies += 1
        book.isAvailable = true
        await book.save()

        // Update user's total fines
        const user = await User.findById(userId)
        user.totalFines += fine
        await user.save()

        res.json({ 
            success: true, 
            message: fine > 0 ? `Book returned with a fine of $${fine}` : "Book returned successfully",
            fine 
        })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Get User's Borrowed Books : /api/borrowing/my-books
export const getUserBorrowings = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId
        
        if (!userId) {
            return res.json({ success: false, message: "User authentication required" })
        }
        
        const borrowings = await Borrowing.find({ userId })
            .populate('bookId', 'title author image category')
            .sort({ borrowDate: -1 })

        res.json({ success: true, borrowings })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Renew Book : /api/borrowing/renew
export const renewBook = async (req, res) => {
    try {
        const { borrowingId } = req.body
        const userId = req.userId || req.body.userId

        if (!userId) {
            return res.json({ success: false, message: "User authentication required" })
        }

        const borrowing = await Borrowing.findOne({ _id: borrowingId, userId })
        
        if (!borrowing) {
            return res.json({ success: false, message: "Borrowing record not found" })
        }

        if (borrowing.status !== 'borrowed') {
            return res.json({ success: false, message: "Book cannot be renewed" })
        }

        if (borrowing.renewalCount >= borrowing.maxRenewals) {
            return res.json({ success: false, message: "Maximum renewals reached" })
        }

        // Extend due date by 14 days
        borrowing.dueDate = new Date(borrowing.dueDate.getTime() + 14 * 24 * 60 * 60 * 1000)
        borrowing.renewalCount += 1
        await borrowing.save()

        res.json({ success: true, message: "Book renewed successfully" })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Get All Borrowings (Admin) : /api/borrowing/all
export const getAllBorrowings = async (req, res) => {
    try {
        const borrowings = await Borrowing.find({})
            .populate('userId', 'name email studentId')
            .populate('bookId', 'title author isbn')
            .sort({ borrowDate: -1 })

        res.json({ success: true, borrowings })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Update Overdue Status : /api/borrowing/update-overdue
export const updateOverdueStatus = async (req, res) => {
    try {
        const currentDate = new Date()
        
        await Borrowing.updateMany(
            { 
                dueDate: { $lt: currentDate },
                status: 'borrowed'
            },
            { status: 'overdue' }
        )

        res.json({ success: true, message: "Overdue status updated" })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}