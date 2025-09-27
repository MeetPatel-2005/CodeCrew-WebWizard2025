import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const BookDetails = () => {
  const { id } = useParams()
  const { books, borrowBook, user, setShowUserLogin } = useAppContext()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const foundBook = books.find(b => b._id === id)
    setBook(foundBook)
    setLoading(false)
  }, [id, books])

  const handleBorrow = async () => {
    if (!user) {
      setShowUserLogin(true)
      return
    }
    await borrowBook(book._id)
  }

  if (loading) {
    return (
      <div className='py-16 text-center'>
        <div className='animate-spin text-4xl mb-4'>📚</div>
        <p>Loading book details...</p>
      </div>
    )
  }

  if (!book) {
    return (
      <div className='py-16 text-center'>
        <span className='text-8xl mb-4 block'>📚</span>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Book Not Found</h2>
        <p className='text-gray-600'>The book you're looking for doesn't exist</p>
      </div>
    )
  }

  return (
    <div className='py-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12'>
        {/* Book Image */}
        <div className='flex justify-center'>
          <div className='max-w-md w-full'>
            <img 
              src={book.image[0]} 
              alt={book.title}
              className='w-full h-auto rounded-xl shadow-lg'
            />
          </div>
        </div>

        {/* Book Details */}
        <div className='space-y-6'>
          <div>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-3'>
              {book.title}
            </h1>
            <p className='text-xl text-indigo-600 font-semibold mb-4'>
              by {book.author}
            </p>
            
            <div className='flex items-center gap-4 mb-6'>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                book.isAvailable && book.availableCopies > 0 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {book.isAvailable && book.availableCopies > 0 ? 'Available' : 'Not Available'}
              </span>
              <span className='bg-gray-100 px-3 py-1 rounded-full text-sm font-medium'>
                {book.category}
              </span>
            </div>
          </div>

          {/* Book Info Grid */}
          <div className='grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg'>
            <div>
              <p className='text-gray-600 text-sm'>Publisher</p>
              <p className='font-semibold'>{book.publisher}</p>
            </div>
            <div>
              <p className='text-gray-600 text-sm'>Published Year</p>
              <p className='font-semibold'>{book.publishedYear}</p>
            </div>
            <div>
              <p className='text-gray-600 text-sm'>ISBN</p>
              <p className='font-semibold text-sm'>{book.isbn}</p>
            </div>
            <div>
              <p className='text-gray-600 text-sm'>Available Copies</p>
              <p className='font-semibold'>
                {book.availableCopies} of {book.totalCopies}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className='text-lg font-semibold text-gray-800 mb-3'>Description</h3>
            <div className='prose prose-gray'>
              {book.description.map((desc, index) => (
                <p key={index} className='text-gray-700 mb-3'>
                  {desc}
                </p>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className='space-y-4 pt-6'>
            {book.isAvailable && book.availableCopies > 0 ? (
              <button 
                onClick={handleBorrow}
                className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl'
              >
                {user ? '📚 Borrow This Book' : '🔑 Login to Borrow'}
              </button>
            ) : (
              <button 
                disabled
                className='w-full bg-gray-300 text-gray-500 py-4 rounded-lg cursor-not-allowed font-semibold text-lg'
              >
                📚 Currently Unavailable
              </button>
            )}
            
            <button 
              onClick={() => window.history.back()}
              className='w-full border-2 border-indigo-600 text-indigo-600 py-3 rounded-lg hover:bg-indigo-50 transition-colors font-semibold'
            >
              ← Back to Books
            </button>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className='mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>Borrowing Information</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-sm'>
          <div className='flex items-start gap-3'>
            <span className='text-2xl'>📅</span>
            <div>
              <p className='font-semibold text-gray-800'>Loan Period</p>
              <p className='text-gray-600'>14 days (renewable twice)</p>
            </div>
          </div>
          <div className='flex items-start gap-3'>
            <span className='text-2xl'>💰</span>
            <div>
              <p className='font-semibold text-gray-800'>Late Fees</p>
              <p className='text-gray-600'>$5 per day after due date</p>
            </div>
          </div>
          <div className='flex items-start gap-3'>
            <span className='text-2xl'>🔄</span>
            <div>
              <p className='font-semibold text-gray-800'>Renewals</p>
              <p className='text-gray-600'>Up to 2 renewals allowed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetails