import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'

const MyBooks = () => {
  const { borrowedBooks, returnBook, renewBook, user, fetchBorrowedBooks } = useAppContext()
  const [activeTab, setActiveTab] = useState('borrowed')

  useEffect(() => {
    if (user) {
      fetchBorrowedBooks()
    }
  }, [user])

  const getBorrowedBooks = () => borrowedBooks.filter(book => book.status === 'borrowed')
  const getOverdueBooks = () => borrowedBooks.filter(book => book.status === 'overdue')
  const getReturnedBooks = () => borrowedBooks.filter(book => book.status === 'returned')

  const handleReturn = async (borrowingId) => {
    await returnBook(borrowingId)
  }

  const handleRenew = async (borrowingId) => {
    await renewBook(borrowingId)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date()
  }

  const getDaysUntilDue = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const BookCard = ({ borrowing, showReturnButton = false }) => (
    <div className='bg-white rounded-lg shadow-md p-6 border border-gray-200'>
      <div className='flex gap-4'>
        <img 
          src={borrowing.bookId?.image?.[0]} 
          alt={borrowing.bookId?.title}
          className='w-20 h-28 object-cover rounded-md'
        />
        <div className='flex-1'>
          <h3 className='font-semibold text-lg text-gray-800 mb-1'>
            {borrowing.bookId?.title}
          </h3>
          <p className='text-indigo-600 font-medium mb-2'>
            by {borrowing.bookId?.author}
          </p>
          <div className='text-sm text-gray-600 space-y-1'>
            <p>Borrowed: {formatDate(borrowing.borrowDate)}</p>
            <p>Due: {formatDate(borrowing.dueDate)}</p>
            {borrowing.returnDate && (
              <p>Returned: {formatDate(borrowing.returnDate)}</p>
            )}
          </div>
          
          {borrowing.status === 'borrowed' && (
            <div className='mt-3'>
              {getDaysUntilDue(borrowing.dueDate) > 0 ? (
                <span className='text-green-600 text-sm font-medium'>
                  Due in {getDaysUntilDue(borrowing.dueDate)} days
                </span>
              ) : (
                <span className='text-red-600 text-sm font-medium'>
                  Overdue by {Math.abs(getDaysUntilDue(borrowing.dueDate))} days
                </span>
              )}
            </div>
          )}

          {borrowing.status === 'overdue' && (
            <div className='mt-3'>
              <span className='text-red-600 text-sm font-medium'>
                Overdue by {Math.abs(getDaysUntilDue(borrowing.dueDate))} days
              </span>
            </div>
          )}

          {borrowing.fine > 0 && (
            <div className='mt-2'>
              <span className='text-red-600 text-sm font-semibold'>
                Fine: ${borrowing.fine}
              </span>
            </div>
          )}
        </div>
      </div>

      {showReturnButton && (borrowing.status === 'borrowed' || borrowing.status === 'overdue') && (
        <div className='flex gap-2 mt-4 pt-4 border-t border-gray-200'>
          <button
            onClick={() => handleReturn(borrowing._id)}
            className='flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-4 rounded-md hover:from-green-700 hover:to-green-800 transition-all font-medium'
          >
            Return Book
          </button>
          {borrowing.renewalCount < borrowing.maxRenewals && borrowing.status === 'borrowed' && (
            <button
              onClick={() => handleRenew(borrowing._id)}
              className='flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all font-medium'
            >
              Renew ({borrowing.maxRenewals - borrowing.renewalCount} left)
            </button>
          )}
        </div>
      )}
    </div>
  )

  if (!user) {
    return (
      <div className='py-16 text-center'>
        <span className='text-8xl mb-4 block'>🔒</span>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Please Login</h2>
        <p className='text-gray-600'>You need to login to view your borrowed books</p>
      </div>
    )
  }

  return (
    <div className='py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2'>My Books</h1>
        <p className='text-gray-600'>Manage your borrowed books and borrowing history</p>
      </div>

      {/* Tabs */}
      <div className='flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit'>
        <button
          onClick={() => setActiveTab('borrowed')}
          className={`px-6 py-2 rounded-md font-medium transition-all ${
            activeTab === 'borrowed'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Borrowed ({getBorrowedBooks().length})
        </button>
        <button
          onClick={() => setActiveTab('overdue')}
          className={`px-6 py-2 rounded-md font-medium transition-all ${
            activeTab === 'overdue'
              ? 'bg-white text-red-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Overdue ({getOverdueBooks().length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-6 py-2 rounded-md font-medium transition-all ${
            activeTab === 'history'
              ? 'bg-white text-gray-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          History ({getReturnedBooks().length})
        </button>
      </div>

      {/* Content */}
      <div className='space-y-6'>
        {activeTab === 'borrowed' && (
          <>
            {getBorrowedBooks().length > 0 ? (
              getBorrowedBooks().map((borrowing) => (
                <BookCard key={borrowing._id} borrowing={borrowing} showReturnButton={true} />
              ))
            ) : (
              <div className='text-center py-16'>
                <span className='text-8xl mb-4 block'>📚</span>
                <h3 className='text-xl font-semibold text-gray-800 mb-2'>No Borrowed Books</h3>
                <p className='text-gray-600'>You haven't borrowed any books yet</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'overdue' && (
          <>
            {getOverdueBooks().length > 0 ? (
              getOverdueBooks().map((borrowing) => (
                <BookCard key={borrowing._id} borrowing={borrowing} showReturnButton={true} />
              ))
            ) : (
              <div className='text-center py-16'>
                <span className='text-8xl mb-4 block'>✅</span>
                <h3 className='text-xl font-semibold text-gray-800 mb-2'>All Clear!</h3>
                <p className='text-gray-600'>No overdue books</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'history' && (
          <>
            {getReturnedBooks().length > 0 ? (
              getReturnedBooks().map((borrowing) => (
                <BookCard key={borrowing._id} borrowing={borrowing} showReturnButton={false} />
              ))
            ) : (
              <div className='text-center py-16'>
                <span className='text-8xl mb-4 block'>📖</span>
                <h3 className='text-xl font-semibold text-gray-800 mb-2'>No History</h3>
                <p className='text-gray-600'>No returned books in history</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default MyBooks