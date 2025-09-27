import express from 'express';
import authUser from '../middlewares/authUser.js';
import authSeller from '../middlewares/authSeller.js';
import { 
    borrowBook, 
    returnBook, 
    getUserBorrowings, 
    renewBook, 
    getAllBorrowings, 
    updateOverdueStatus 
} from '../controllers/borrowingController.js';

const borrowingRouter = express.Router();

// Student/User routes
borrowingRouter.post('/borrow', authUser, borrowBook);
borrowingRouter.post('/return', authUser, returnBook);
borrowingRouter.get('/my-books', authUser, getUserBorrowings);
borrowingRouter.post('/renew', authUser, renewBook);

// Admin routes
borrowingRouter.get('/all', authSeller, getAllBorrowings);
borrowingRouter.post('/update-overdue', authSeller, updateOverdueStatus);

export default borrowingRouter;