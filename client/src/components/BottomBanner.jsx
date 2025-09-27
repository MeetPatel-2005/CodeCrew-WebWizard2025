import React from 'react';

const BottomBanner = () => {
  return (
    <div className='mt-24 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 rounded-3xl overflow-hidden relative'>
      <div className='flex flex-col lg:flex-row items-center min-h-[500px]'>
        {/* Left side - Interactive book illustrations matching the image */}
        <div className='flex-1 relative p-8 lg:p-16 flex items-center justify-center'>
          <div className='relative w-80 h-80 lg:w-96 lg:h-96'>
            {/* Sparkle/Star effect - top left */}
            <div className='absolute top-8 left-16 text-yellow-300 text-2xl animate-pulse transform hover:scale-110 transition-transform cursor-pointer'>
              ✨
            </div>
            
            {/* Main stack of books - center - matching the image exactly */}
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:rotate-3 transition-transform duration-300 cursor-pointer group'>
              {/* Green book (top) */}
              <div className='w-24 h-32 bg-green-500 rounded-lg shadow-2xl group-hover:shadow-3xl transition-shadow border-2 border-green-400'></div>
              {/* Red book (middle) */}
              <div className='w-24 h-32 bg-red-500 rounded-lg shadow-2xl -mt-28 ml-4 group-hover:shadow-3xl transition-shadow border-2 border-red-400'></div>
              {/* Cyan book (bottom) */}
              <div className='w-24 h-32 bg-cyan-500 rounded-lg shadow-2xl -mt-28 ml-2 group-hover:shadow-3xl transition-shadow border-2 border-cyan-400'></div>
            </div>
            
            {/* Floating open book/document - top center */}
            <div className='absolute top-6 left-1/2 transform -translate-x-1/2 hover:scale-110 transition-transform cursor-pointer'>
              <div className='w-20 h-16 bg-purple-200 rounded-lg shadow-lg relative overflow-hidden border-2 border-purple-300'>
                <div className='absolute inset-0 bg-gradient-to-r from-purple-300 to-purple-100 rounded-lg'></div>
                <div className='absolute top-3 left-3 right-3 h-1 bg-purple-500 rounded'></div>
                <div className='absolute top-5 left-3 right-3 h-1 bg-purple-500 rounded'></div>
                <div className='absolute top-7 left-3 right-3 h-1 bg-purple-500 rounded'></div>
                <div className='absolute top-9 left-3 right-3 h-1 bg-purple-500 rounded'></div>
              </div>
            </div>
            
            {/* Paper with writing - bottom left */}
            <div className='absolute bottom-12 left-8 transform -rotate-12 hover:rotate-0 transition-transform cursor-pointer group'>
              <div className='w-20 h-24 bg-white rounded-lg shadow-xl relative group-hover:shadow-2xl transition-shadow border border-gray-200'>
                <div className='absolute top-4 left-3 right-3 h-1 bg-gray-400 rounded'></div>
                <div className='absolute top-6 left-3 right-3 h-1 bg-gray-400 rounded'></div>
                <div className='absolute top-8 left-3 right-3 h-1 bg-gray-400 rounded'></div>
                <div className='absolute top-10 left-3 right-3 h-1 bg-gray-400 rounded'></div>
                <div className='absolute top-12 left-3 right-3 h-1 bg-gray-400 rounded'></div>
                <div className='absolute bottom-4 right-3 text-orange-500 text-sm'>📝</div>
              </div>
            </div>
            
            {/* Graduation cap - bottom right */}
            <div className='absolute bottom-8 right-8 transform rotate-12 hover:rotate-0 transition-transform cursor-pointer'>
              <div className='text-yellow-400 text-5xl hover:text-yellow-300 transition-colors drop-shadow-lg'>
                🎓
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Content with left alignment */}
        <div className='flex-1 p-8 lg:p-16 text-white'>
          <h2 className='text-4xl lg:text-5xl font-bold mb-8 text-left'>
            Why Choose Our Library?
          </h2>
          
          <div className='space-y-6'>
            {/* Feature 1 */}
            <div className='flex items-start gap-4 hover:translate-x-2 transition-transform cursor-pointer'>
              <div className='flex-shrink-0 w-12 h-12 bg-blue-500/80 rounded-xl flex items-center justify-center hover:bg-blue-500/90 transition-colors shadow-lg'>
                <span className='text-2xl'>📚</span>
              </div>
              <div>
                <h3 className='text-xl font-semibold mb-2'>Vast Collection</h3>
                <p className='text-white/80'>Over 10,000 books across all genres and subjects.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className='flex items-start gap-4 hover:translate-x-2 transition-transform cursor-pointer'>
              <div className='flex-shrink-0 w-12 h-12 bg-blue-500/80 rounded-xl flex items-center justify-center hover:bg-blue-500/90 transition-colors shadow-lg'>
                <span className='text-2xl'>⚡</span>
              </div>
              <div>
                <h3 className='text-xl font-semibold mb-2'>Instant Borrowing</h3>
                <p className='text-white/80'>Borrow books instantly with our digital system.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className='flex items-start gap-4 hover:translate-x-2 transition-transform cursor-pointer'>
              <div className='flex-shrink-0 w-12 h-12 bg-blue-500/80 rounded-xl flex items-center justify-center hover:bg-blue-500/90 transition-colors shadow-lg'>
                <span className='text-2xl'>💰</span>
              </div>
              <div>
                <h3 className='text-xl font-semibold mb-2'>Affordable Access</h3>
                <p className='text-white/80'>Free membership with minimal late fees.</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className='flex items-start gap-4 hover:translate-x-2 transition-transform cursor-pointer'>
              <div className='flex-shrink-0 w-12 h-12 bg-blue-500/80 rounded-xl flex items-center justify-center hover:bg-blue-500/90 transition-colors shadow-lg'>
                <span className='text-2xl'>🏆</span>
              </div>
              <div>
                <h3 className='text-xl font-semibold mb-2'>Trusted by Students</h3>
                <p className='text-white/80'>Preferred by 1000+ students and faculty.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
