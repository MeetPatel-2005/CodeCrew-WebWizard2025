import React from 'react'
import BookCard from './BookCard'
import { useAppContext } from '../context/AppContext';

const PopularBooks = () => {
    const { books } = useAppContext();
    
    return (
        <div className='mt-16'>
            <div className='flex items-center gap-3 mb-2'>
                <span className='text-2xl'>📚</span>
                <p className='text-2xl md:text-3xl font-semibold text-gray-800'>Popular Books</p>
            </div>
            <p className='text-gray-600 mb-8'>Discover the most borrowed and loved books in our collection</p>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                {books.filter((book) => book.isAvailable && book.availableCopies > 0).slice(0, 10).map((book, index) => (
                    <BookCard key={index} book={book} />
                ))}
            </div>
            
            {books.filter((book) => book.isAvailable && book.availableCopies > 0).length === 0 && (
                <div className='text-center py-12'>
                    <span className='text-6xl mb-4 block'>📚</span>
                    <p className='text-gray-500 text-lg'>No books available at the moment</p>
                </div>
            )}
        </div>
    )
}

export default PopularBooks
