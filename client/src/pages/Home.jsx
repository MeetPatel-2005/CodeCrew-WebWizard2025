import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import PopularBooks from '../components/PopularBooks'
import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <div>
      <MainBanner />
      <div className='px-6 md:px-16 lg:px-24 xl:px-32'>
        <Categories />
        <PopularBooks />
      </div>
      {/* BottomBanner gets its own container for better spacing */}
      <div className='px-6 md:px-16 lg:px-24 xl:px-32'>
        <BottomBanner/>
      </div>
      <div className='px-6 md:px-16 lg:px-24 xl:px-32'>
        <NewsLetter />
      </div>
    </div>
  )
}

export default Home
