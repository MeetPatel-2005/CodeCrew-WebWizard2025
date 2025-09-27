import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { bookCategories } from '../../assets/books'
import toast from 'react-hot-toast'

const AddBook = () => {
  const { axios, fetchBooks } = useAppContext()
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    isbn: '',
    description: [''],
    category: '',
    publisher: '',
    publishedYear: '',
    totalCopies: 1,
    availableCopies: 1
  })
  const [images, setImages] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBookData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDescriptionChange = (index, value) => {
    const newDescription = [...bookData.description]
    newDescription[index] = value
    setBookData(prev => ({
      ...prev,
      description: newDescription
    }))
  }

  const addDescriptionField = () => {
    setBookData(prev => ({
      ...prev,
      description: [...prev.description, '']
    }))
  }

  const removeDescriptionField = (index) => {
    if (bookData.description.length > 1) {
      const newDescription = bookData.description.filter((_, i) => i !== index)
      setBookData(prev => ({
        ...prev,
        description: newDescription
      }))
    }
  }

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('bookData', JSON.stringify(bookData))
      
      images.forEach(image => {
        formData.append('images', image)
      })

      const { data } = await axios.post('/api/book/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (data.success) {
        toast.success('Book added successfully!')
        setBookData({
          title: '',
          author: '',
          isbn: '',
          description: [''],
          category: '',
          publisher: '',
          publishedYear: '',
          totalCopies: 1,
          availableCopies: 1
        })
        setImages([])
        fetchBooks()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Failed to add book')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-gray-800 mb-2'>Add New Book</h1>
          <p className='text-gray-600'>Fill in the details to add a new book to the library</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Book Title *
              </label>
              <input
                type='text'
                name='title'
                value={bookData.title}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none'
                placeholder='Enter book title'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Author *
              </label>
              <input
                type='text'
                name='author'
                value={bookData.author}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none'
                placeholder='Enter author name'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                ISBN *
              </label>
              <input
                type='text'
                name='isbn'
                value={bookData.isbn}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none'
                placeholder='Enter ISBN'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Category *
              </label>
              <select
                name='category'
                value={bookData.category}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none'
                required
              >
                <option value=''>Select a category</option>
                {bookCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Publisher *
              </label>
              <input
                type='text'
                name='publisher'
                value={bookData.publisher}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none'
                placeholder='Enter publisher name'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Published Year *
              </label>
              <input
                type='number'
                name='publishedYear'
                value={bookData.publishedYear}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none'
                placeholder='Enter published year'
                min='1000'
                max={new Date().getFullYear()}
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Total Copies *
              </label>
              <input
                type='number'
                name='totalCopies'
                value={bookData.totalCopies}
                onChange={(e) => {
                  const value = parseInt(e.target.value)
                  setBookData(prev => ({
                    ...prev,
                    totalCopies: value,
                    availableCopies: value
                  }))
                }}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none'
                placeholder='Enter total copies'
                min='1'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Book Images *
              </label>
              <input
                type='file'
                multiple
                accept='image/*'
                onChange={handleImageChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none'
                required
              />
              <p className='text-sm text-gray-500 mt-1'>Upload one or more images of the book</p>
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Description *
            </label>
            {bookData.description.map((desc, index) => (
              <div key={index} className='flex gap-2 mb-2'>
                <textarea
                  value={desc}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  className='flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none'
                  placeholder={`Description paragraph ${index + 1}`}
                  rows='3'
                  required
                />
                {bookData.description.length > 1 && (
                  <button
                    type='button'
                    onClick={() => removeDescriptionField(index)}
                    className='px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors self-start'
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type='button'
              onClick={addDescriptionField}
              className='mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'
            >
              + Add Description Paragraph
            </button>
          </div>

          <div className='flex gap-4'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isSubmitting ? 'Adding Book...' : 'Add Book to Library'}
            </button>
            <button
              type='button'
              onClick={() => {
                setBookData({
                  title: '',
                  author: '',
                  isbn: '',
                  description: [''],
                  category: '',
                  publisher: '',
                  publishedYear: '',
                  totalCopies: 1,
                  availableCopies: 1
                })
                setImages([])
              }}
              className='px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBook