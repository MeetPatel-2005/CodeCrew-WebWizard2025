import React from 'react'
import { bookCategories } from '../assets/books'
import { useAppContext } from '../context/AppContext'

const Categories = () => {
    const {navigate} = useAppContext()

    const categoryIcons = {
        'Fiction': '📚',
        'Non-Fiction': '📖',
        'Science': '🔬',
        'Technology': '💻',
        'History': '🏛️',
        'Biography': '👤',
        'Literature': '✍️',
        'Philosophy': '🤔',
        'Arts': '🎨',
        'Business': '💼',
        'Health': '🏥',
        'Education': '🎓',
        'Reference': '📋',
        'Children': '🧸',
        'Young Adult': '🌟'
    }

    const categoryColors = [
        'from-blue-400 to-blue-600',
        'from-green-400 to-green-600',
        'from-purple-400 to-purple-600',
        'from-pink-400 to-pink-600',
        'from-yellow-400 to-yellow-600',
        'from-indigo-400 to-indigo-600',
        'from-red-400 to-red-600',
        'from-teal-400 to-teal-600',
        'from-orange-400 to-orange-600',
        'from-cyan-400 to-cyan-600',
        'from-emerald-400 to-emerald-600',
        'from-violet-400 to-violet-600',
        'from-lime-400 to-lime-600',
        'from-rose-400 to-rose-600',
        'from-sky-400 to-sky-600'
    ]

    return (
        <div className='mt-16'>
            <p className='text-2xl md:text-3xl font-semibold text-gray-800 mb-2'>Book Categories</p>
            <p className='text-gray-600 mb-8'>Explore our diverse collection of books across various subjects</p>
            
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
                {bookCategories.map((category, index) => (
                    <div 
                        key={index} 
                        className={`group cursor-pointer p-4 rounded-xl bg-gradient-to-br ${categoryColors[index % categoryColors.length]} hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg text-white`}
                        onClick={() => {
                            navigate(`/books/${category.toLowerCase()}`);
                            scrollTo(0, 0)
                        }}
                    >
                        <div className='flex flex-col items-center gap-2'>
                            <span className='text-3xl mb-2 group-hover:scale-110 transition-transform'>
                                {categoryIcons[category] || '📖'}
                            </span>
                            <p className='text-sm font-semibold text-center leading-tight'>
                                {category}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories
