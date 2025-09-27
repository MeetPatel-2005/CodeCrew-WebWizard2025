import { v2 as cloudinary } from "cloudinary"
import Book from "../models/Book.js"

// Add Book : /api/book/add
export const addBook = async (req, res)=>{
    try {
        let bookData = JSON.parse(req.body.bookData)

        const images = req.files

        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url
            })
        )

        await Book.create({...bookData, image: imagesUrl})

        res.json({success: true, message: "Book Added Successfully"})

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Get All Books : /api/book/list
export const bookList = async (req, res)=>{
    try {
        const books = await Book.find({})
        res.json({success: true, books})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Get single Book : /api/book/id
export const bookById = async (req, res)=>{
    try {
        const { id } = req.body
        const book = await Book.findById(id)
        res.json({success: true, book})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Change Book Availability : /api/book/availability
export const changeAvailability = async (req, res)=>{
    try {
        const { id, isAvailable } = req.body
        await Book.findByIdAndUpdate(id, {isAvailable})
        res.json({success: true, message: "Book Availability Updated"})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Update Book Details : /api/book/update
export const updateBook = async (req, res)=>{
    try {
        const { id, ...updateData } = req.body
        await Book.findByIdAndUpdate(id, updateData)
        res.json({success: true, message: "Book Updated Successfully"})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Delete Book : /api/book/delete
export const deleteBook = async (req, res)=>{
    try {
        const { id } = req.body
        await Book.findByIdAndDelete(id)
        res.json({success: true, message: "Book Deleted Successfully"})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}
