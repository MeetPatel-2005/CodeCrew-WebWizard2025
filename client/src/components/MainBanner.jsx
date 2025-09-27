import React from 'react'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className='relative bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute top-10 left-10 text-6xl md:text-8xl'>📚</div>
        <div className='absolute top-32 right-20 text-4xl md:text-6xl'>📖</div>
        <div className='absolute bottom-20 left-20 text-5xl md:text-7xl'>✍️</div>
        <div className='absolute bottom-10 right-10 text-3xl md:text-5xl'>🎓</div>
        <div className='absolute top-1/2 left-1/3 text-4xl md:text-6xl'>📝</div>
      </div>

      {/* Content */}
      <div className='relative z-10 text-center px-4 max-w-4xl mx-auto'>
        <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight'>
          Welcome to Our 
          <span className='block text-yellow-300 mt-2'>Digital Library</span>
        </h1>
        
        <p className='text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed'>
          Discover thousands of books, borrow your favorites, and embark on endless learning adventures. 
          Knowledge at your fingertips, anytime, anywhere.
        </p>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-8'>
          <Link to={"/books"} className='group flex items-center gap-3 px-8 py-4 bg-white text-indigo-600 hover:bg-gray-100 transition-all duration-300 rounded-full font-semibold shadow-lg hover:shadow-xl'>
            <span>Browse Books</span>
            <span className='text-xl group-hover:translate-x-1 transition-transform'>📚</span>
          </Link>

          <Link to={"/books"} className='group flex items-center gap-3 px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-indigo-600 transition-all duration-300 rounded-full font-semibold'>
            <span>Explore Categories</span>
            <span className='text-xl group-hover:translate-x-1 transition-transform'>🔍</span>
          </Link>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-center'>
          <div className='text-white'>
            <div className='text-2xl md:text-3xl font-bold'>1000+</div>
            <div className='text-blue-200 text-sm'>Books Available</div>
          </div>
          <div className='text-white'>
            <div className='text-2xl md:text-3xl font-bold'>15</div>
            <div className='text-blue-200 text-sm'>Categories</div>
          </div>
          <div className='text-white'>
            <div className='text-2xl md:text-3xl font-bold'>500+</div>
            <div className='text-blue-200 text-sm'>Active Members</div>
          </div>
          <div className='text-white'>
            <div className='text-2xl md:text-3xl font-bold'>24/7</div>
            <div className='text-blue-200 text-sm'>Access</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainBanner
