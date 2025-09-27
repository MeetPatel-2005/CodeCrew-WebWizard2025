import React from 'react'
import { useAppContext } from '../context/AppContext'

const BookCard = ({ book }) => {
  const { navigate, user, borrowBook, setShowUserLogin } = useAppContext()

  const handleBorrowClick = async (e) => {
    e.stopPropagation()
    if (!user) {
      setShowUserLogin(true)
      return
    }
    console.log('📚 Borrowing book:', book._id, 'User:', user.name)
    await borrowBook(book._id)
  }

  const handleCardClick = () => {
    navigate(`/books/${book.category}/${book._id}`)
  }

  return (
    <div 
      onClick={handleCardClick}
      className='bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:scale-105'
    >
      <div className='relative group'>
        <img 
          src={book.image[0]} 
          alt={book.title}
          className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
        <div className='absolute top-3 left-3'>
          <span className='text-3xl animate-bounce'>📚</span>
        </div>
        <div className='absolute top-3 right-3'>
          <span className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
            book.isAvailable && book.availableCopies > 0 
              ? 'bg-green-100/90 text-green-800' 
              : 'bg-red-100/90 text-red-800'
          }`}>
            {book.isAvailable && book.availableCopies > 0 ? 'Available' : 'Not Available'}
          </span>
        </div>
        <div className='absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          <span className='text-white text-sm bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm'>
            Click to view details
          </span>
        </div>
      </div>
      
      <div className='p-4'>
        <h3 className='font-semibold text-lg text-gray-800 mb-1 line-clamp-2'>
          {book.title}
        </h3>
        <p className='text-indigo-600 font-medium mb-2'>
          by {book.author}
        </p>
        
        <div className='flex justify-between items-center text-sm text-gray-600 mb-3'>
          <span className='bg-gray-100 px-2 py-1 rounded-full'>
            {book.category}
          </span>
          <span>
            {book.availableCopies}/{book.totalCopies} copies
          </span>
        </div>

        <div className='flex justify-between items-center text-xs text-gray-500 mb-4'>
          <span>{book.publisher}</span>
          <span>{book.publishedYear}</span>
        </div>
        
        {book.isAvailable && book.availableCopies > 0 && user && (
          <button 
            onClick={handleBorrowClick}
            className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium'
          >
            Borrow Book
          </button>
        )}
        
        {(!book.isAvailable || book.availableCopies === 0) && (
          <button 
            disabled
            className='w-full bg-gray-300 text-gray-500 py-2 rounded-lg cursor-not-allowed font-medium'
          >
            Not Available
          </button>
        )}
        
        {!user && (
          <button 
            onClick={(e) => {
              e.stopPropagation()
              alert('Please login to borrow books')
            }}
            className='w-full bg-gray-200 text-gray-600 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium'
          >
            Login to Borrow
          </button>
        )}
      </div>
    </div>
  )
}

export default BookCard