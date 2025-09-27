import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import { addBook, changeAvailability, bookById, bookList, updateBook, deleteBook } from '../controllers/bookController.js';

const bookRouter = express.Router();

bookRouter.post('/add', upload.array(["images"]), authSeller, addBook);
bookRouter.get('/list', bookList)
bookRouter.post('/id', bookById)
bookRouter.post('/availability', authSeller, changeAvailability)
bookRouter.post('/update', authSeller, updateBook)
bookRouter.post('/delete', authSeller, deleteBook)

export default bookRouter;