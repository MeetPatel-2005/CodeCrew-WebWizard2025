import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import BookCard from '../components/BookCard'

const BookCategory = () => {
  const { category } = useParams()
  const { books, searchQuery } = useAppContext()
  const [filteredBooks, setFilteredBooks] = useState([])
  const [sortBy, setSortBy] = useState('title')

  useEffect(() => {
    let filtered = books.filter(book => 
      book.category.toLowerCase() === category.toLowerCase()
    )

    // Filter by search query if exists
    if (searchQuery && searchQuery.trim() !== '') {
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort books
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'author':
          return a.author.localeCompare(b.author)
        case 'year':
          return b.publishedYear - a.publishedYear
        case 'available':
          return b.availableCopies - a.availableCopies
        default:
          return 0
      }
    })

    setFilteredBooks(filtered)
  }, [books, category, searchQuery, sortBy])

  const getCategoryIcon = (categoryName) => {
    const icons = {
      'fiction': '📚',
      'non-fiction': '📖',
      'science': '🔬',
      'technology': '💻',
      'history': '🏛️',
      'biography': '👤',
      'literature': '✍️',
      'philosophy': '🤔',
      'arts': '🎨',
      'business': '💼',
      'health': '🏥',
      'education': '🎓',
      'reference': '📋',
      'children': '🧸',
      'young adult': '🌟'
    }
    return icons[categoryName.toLowerCase()] || '📖'
  }

  return (
    <div className='py-8'>
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-4'>
          <span className='text-4xl'>{getCategoryIcon(category)}</span>
          <div>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-800 capitalize'>
              {category} Books
            </h1>
            <p className='text-gray-600'>
              Explore our {category.toLowerCase()} collection
            </p>
          </div>
        </div>
      </div>

      {/* Sort Controls */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-4 bg-white rounded-lg shadow-sm border'>
        <div className='flex items-center gap-4'>
          <label className='text-sm font-medium text-gray-700'>Sort by:</label>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className='p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="year">Publication Year</option>
            <option value="available">Available Copies</option>
          </select>
        </div>

        <div className='bg-gray-100 px-4 py-2 rounded-md'>
          <span className='text-sm text-gray-600'>
            {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
          </span>
        </div>
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className='text-center py-16'>
          <span className='text-8xl mb-4 block'>{getCategoryIcon(category)}</span>
          <h3 className='text-xl font-semibold text-gray-800 mb-2'>
            No {category} Books Found
          </h3>
          <p className='text-gray-600'>
            {searchQuery 
              ? `No ${category.toLowerCase()} books match your search "${searchQuery}"`
              : `No books available in the ${category.toLowerCase()} category`
            }
          </p>
        </div>
      )}
    </div>
  )
}

export default BookCategory