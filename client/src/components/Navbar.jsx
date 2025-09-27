import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const [profileOpen, setProfileOpen] = React.useState(false)
    const {user, setUser, setShowUserLogin, navigate, setSearchQuery, searchQuery, borrowedBooks, axios} = useAppContext();

    const logout = async ()=>{
      try {
        const { data } = await axios.get('/api/user/logout')
        if(data.success){
          toast.success(data.message)
          setUser(null);
          setProfileOpen(false); // Close profile dropdown on logout
          navigate('/')
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
        
    }

    // Close profile dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event) => {
        if (profileOpen && !event.target.closest('.profile-dropdown')) {
          setProfileOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [profileOpen])

    useEffect(()=>{
      if(searchQuery.length > 0){
        navigate("/books")
      }
    },[searchQuery])

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-indigo-200 bg-white/95 backdrop-blur-md relative transition-all shadow-sm">

      <NavLink to='/' onClick={()=> {
        setOpen(false)
        setProfileOpen(false)
      }} className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">📚</span>
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          LibraryMS
        </span>
      </NavLink>

      <div className="hidden sm:flex items-center gap-8">
        <NavLink to='/' onClick={() => setProfileOpen(false)} className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Home</NavLink>
        <NavLink to='/books' onClick={() => setProfileOpen(false)} className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">All Books</NavLink>
        <NavLink to='/' onClick={() => setProfileOpen(false)} className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Contact</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-indigo-200 px-3 rounded-full bg-white/50">
          <input onChange={(e)=> setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search books..." />
         <img src={assets.search_icon} alt='search' className='w-4 h-4'/>
        </div>

        <div onClick={()=> navigate("/my-books")} className="relative cursor-pointer bg-indigo-100 p-2 rounded-full hover:bg-indigo-200 transition-colors">
          <span className="text-2xl">📖</span>
          {borrowedBooks && borrowedBooks.length > 0 && (
            <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-600 w-[18px] h-[18px] rounded-full">
              {borrowedBooks.filter(book => book.status === 'borrowed' || book.status === 'overdue').length}
            </button>
          )}
        </div>

      {!user ? ( <button onClick={()=> setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition text-white rounded-full font-medium shadow-md">
          Login
        </button>)
        :
        (
          <div className='relative profile-dropdown'>
            <img 
              src={assets.profile_icon} 
              className={`w-10 h-10 rounded-full border-2 cursor-pointer transition-all duration-200 ${
                profileOpen ? 'border-indigo-400 ring-2 ring-indigo-200' : 'border-indigo-200 hover:border-indigo-300'
              }`}
              alt="Profile" 
              onClick={() => setProfileOpen(!profileOpen)}
            />
            {profileOpen && (
              <div className='absolute top-14 right-0 bg-white dropdown-shadow border border-gray-200 rounded-xl overflow-hidden min-w-[280px] z-[60] animate-in'>
                {/* User Info Header */}
                <div className='bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white'>
                  <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 bg-white/20 rounded-full flex items-center justify-center'>
                      <span className='text-xl'>👤</span>
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='font-semibold text-white truncate text-base'>
                        {user?.name || 'User'}
                      </p>
                      <p className='text-indigo-100 text-sm truncate'>
                        {user?.email || 'user@example.com'}
                      </p>
                      {user?.studentId && (
                        <p className='text-indigo-200 text-xs'>
                          ID: {user.studentId}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className='py-2'>
                  <div
                    onClick={() => {
                      navigate("/my-books")
                      setProfileOpen(false)
                    }}
                    className='px-4 py-3 hover:bg-indigo-50 cursor-pointer flex items-center gap-3 transition-colors'
                  >
                    <span className='text-xl'>📚</span>
                    <div>
                      <p className='font-medium text-gray-800'>My Books</p>
                      <p className='text-xs text-gray-500'>View borrowed books</p>
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      navigate("/books")
                      setProfileOpen(false)
                    }}
                    className='px-4 py-3 hover:bg-indigo-50 cursor-pointer flex items-center gap-3 transition-colors'
                  >
                    <span className='text-xl'>🔍</span>
                    <div>
                      <p className='font-medium text-gray-800'>Browse Books</p>
                      <p className='text-xs text-gray-500'>Explore our collection</p>
                    </div>
                  </div>

                  <hr className='my-2 border-gray-100' />

                  <div
                    onClick={() => {
                      logout()
                      setProfileOpen(false)
                    }}
                    className='px-4 py-3 hover:bg-red-50 cursor-pointer flex items-center gap-3 transition-colors text-red-600'
                  >
                    <span className='text-xl'>🚪</span>
                    <div>
                      <p className='font-medium'>Logout</p>
                      <p className='text-xs text-red-400'>Sign out of your account</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

<div className='flex items-center gap-6 sm:hidden'>
      <div onClick={()=> navigate("/my-books")} className="relative cursor-pointer bg-indigo-100 p-2 rounded-full">
          <span className="text-lg">📖</span>
          {borrowedBooks && borrowedBooks.length > 0 && (
            <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-600 w-[18px] h-[18px] rounded-full">
              {borrowedBooks.filter(book => book.status === 'borrowed' || book.status === 'overdue').length}
            </button>
          )}
        </div>
    <button onClick={() => {
      setOpen(!open)
      setProfileOpen(false) // Close profile dropdown when mobile menu opens
    }} aria-label="Menu" className="">
        <img  src={assets.menu_icon} alt='menu'/>
      </button>
</div>
      

      { open && (
        <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-lg py-4 flex-col items-start gap-2 px-5 text-sm md:hidden border-t border-indigo-200`}>
        <NavLink to="/" onClick={()=> setOpen(false)} className="text-gray-700 hover:text-indigo-600 py-2">Home</NavLink>
        <NavLink to="/books" onClick={()=> setOpen(false)} className="text-gray-700 hover:text-indigo-600 py-2">All Books</NavLink>
        {user && 
        <NavLink to="/my-books" onClick={()=> setOpen(false)} className="text-gray-700 hover:text-indigo-600 py-2">My Books</NavLink>
        }
        <NavLink to="/" onClick={()=> setOpen(false)} className="text-gray-700 hover:text-indigo-600 py-2">Contact</NavLink>

        {!user ? (
          <button onClick={()=>{
            setOpen(false);
            setShowUserLogin(true);
          }} className="cursor-pointer px-6 py-2 mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition text-white rounded-full text-sm font-medium">
          Login
        </button>
        ) : (
          <div className="mt-2 p-3 bg-indigo-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">👤</span>
              <div>
                <p className="font-medium text-gray-800 text-sm">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            <button 
              onClick={() => {
                logout()
                setOpen(false)
              }} 
              className="w-full text-left text-red-600 text-sm hover:bg-red-50 p-2 rounded"
            >
              🚪 Logout
            </button>
          </div>
        )}
        
      </div>
      )}

    </nav>
  )
}

export default Navbar
