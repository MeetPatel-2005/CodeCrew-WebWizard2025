import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import BookCard from '../components/BookCard'
import { bookCategories } from '../assets/books'

const AllBooks = () => {
  const { books, searchQuery } = useAppContext()
  const [filteredBooks, setFilteredBooks] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('title')

  useEffect(() => {
    let filtered = books

    // Filter by search query
    if (searchQuery && searchQuery.trim() !== '') {
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(book => book.category === selectedCategory)
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
  }, [books, searchQuery, selectedCategory, sortBy])

  return (
    <div className='py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2'>All Books</h1>
        <p className='text-gray-600'>Browse our complete collection of books</p>
      </div>

      {/* Filters and Sort */}
      <div className='flex flex-col lg:flex-row gap-4 mb-8 p-4 bg-white rounded-lg shadow-sm border'>
        <div className='flex-1'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Filter by Category</label>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
          >
            <option value="All">All Categories</option>
            {bookCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className='flex-1'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Sort by</label>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="year">Publication Year</option>
            <option value="available">Available Copies</option>
          </select>
        </div>

        <div className='flex items-end'>
          <div className='bg-gray-100 px-4 py-2 rounded-md'>
            <span className='text-sm text-gray-600'>
              {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
            </span>
          </div>
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
          <span className='text-8xl mb-4 block'>📚</span>
          <h3 className='text-xl font-semibold text-gray-800 mb-2'>No Books Found</h3>
          <p className='text-gray-600'>
            {searchQuery 
              ? `No books match your search "${searchQuery}"`
              : selectedCategory !== 'All' 
                ? `No books found in ${selectedCategory} category`
                : 'No books available in the library'
            }
          </p>
        </div>
      )}
    </div>
  )
}

export default AllBooks