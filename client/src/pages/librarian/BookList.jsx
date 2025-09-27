import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const BookList = () => {
  const { books, axios, fetchBooks } = useAppContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredBooks, setFilteredBooks] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    let filtered = books

    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(book => book.category === selectedCategory)
    }

    setFilteredBooks(filtered)
  }, [books, searchTerm, selectedCategory])

  const handleAvailabilityToggle = async (bookId, currentStatus) => {
    try {
      const { data } = await axios.post('/api/book/availability', {
        id: bookId,
        isAvailable: !currentStatus
      })

      if (data.success) {
        toast.success('Book availability updated')
        fetchBooks()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Failed to update book availability')
    }
  }

  const handleDelete = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const { data } = await axios.post('/api/book/delete', { id: bookId })

        if (data.success) {
          toast.success('Book deleted successfully')
          fetchBooks()
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error('Failed to delete book')
      }
    }
  }

  const categories = ['All', ...new Set(books.map(book => book.category))]

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-800 mb-2'>Manage Books</h1>
        <p className='text-gray-600'>View and manage all books in the library</p>
      </div>

      {/* Search and Filter */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6'>
        <div className='flex flex-col lg:flex-row gap-4'>
          <div className='flex-1'>
            <input
              type='text'
              placeholder='Search books by title, author, or ISBN...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none'
            />
          </div>
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none'
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className='text-sm text-gray-600 flex items-center'>
            {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Books Table */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Book</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Author</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Category</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>ISBN</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Copies</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Status</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredBooks.map((book) => (
                <tr key={book._id} className='hover:bg-gray-50'>
                  <td className='py-4 px-4'>
                    <div className='flex items-center gap-3'>
                      <img
                        src={book.image[0]}
                        alt={book.title}
                        className='w-12 h-16 object-cover rounded'
                      />
                      <div>
                        <h3 className='font-medium text-gray-800 line-clamp-2'>
                          {book.title}
                        </h3>
                        <p className='text-sm text-gray-600'>
                          {book.publisher} ({book.publishedYear})
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className='py-4 px-4 text-gray-700'>{book.author}</td>
                  <td className='py-4 px-4'>
                    <span className='px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full'>
                      {book.category}
                    </span>
                  </td>
                  <td className='py-4 px-4 text-sm text-gray-600'>{book.isbn}</td>
                  <td className='py-4 px-4'>
                    <div className='text-sm'>
                      <div className='text-gray-700'>
                        Available: {book.availableCopies}
                      </div>
                      <div className='text-gray-500'>
                        Total: {book.totalCopies}
                      </div>
                    </div>
                  </td>
                  <td className='py-4 px-4'>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      book.isAvailable && book.availableCopies > 0
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {book.isAvailable && book.availableCopies > 0 ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className='py-4 px-4'>
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() => handleAvailabilityToggle(book._id, book.isAvailable)}
                        className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                          book.isAvailable
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                        }`}
                      >
                        {book.isAvailable ? 'Disable' : 'Enable'}
                      </button>
                      <button
                        onClick={() => handleDelete(book._id)}
                        className='px-3 py-1 text-xs bg-red-100 text-red-800 rounded font-medium hover:bg-red-200 transition-colors'
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBooks.length === 0 && (
            <div className='text-center py-12'>
              <span className='text-8xl mb-4 block'>📚</span>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>No Books Found</h3>
              <p className='text-gray-600'>
                {searchTerm
                  ? `No books match your search "${searchTerm}"`
                  : 'No books available in the library'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookList