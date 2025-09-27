import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const LibrarianLayout = () => {
  const { setIsLibrarian, axios } = useAppContext()

  const handleLogout = async () => {
    try {
      await axios.get('/api/seller/logout')
      setIsLibrarian(false)
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Logout failed')
    }
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b border-gray-200'>
        <div className='px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='text-2xl'>👨‍🏫</div>
              <h1 className='text-xl font-bold text-gray-800'>Librarian Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className='flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'
            >
              <span>🚪</span>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className='flex'>
        {/* Sidebar */}
        <nav className='w-64 bg-white shadow-sm min-h-screen'>
          <div className='p-6'>
            <div className='space-y-2'>
              <NavLink
                to='/librarian'
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <span>➕</span>
                Add Book
              </NavLink>
              
              <NavLink
                to='/librarian/book-list'
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <span>📚</span>
                Manage Books
              </NavLink>
              
              <NavLink
                to='/librarian/borrowing-history'
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <span>📖</span>
                Borrowing History
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className='flex-1 p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default LibrarianLayout