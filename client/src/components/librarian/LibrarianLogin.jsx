import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const LibrarianLogin = () => {
  const { setIsLibrarian, axios } = useAppContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/seller/login', { email, password })
      if (data.success) {
        setIsLibrarian(true)
        toast.success('Welcome, Librarian!')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Invalid librarian credentials')
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md'>
        <div className='text-center mb-8'>
          <div className='text-5xl mb-4'>👨‍🏫</div>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
            Librarian Portal
          </h1>
          <p className='text-gray-600 mt-2'>Access the library management system</p>
        </div>

        <form onSubmit={handleLogin} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Email Address
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors'
              placeholder='Enter your email'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Password
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors'
              placeholder='Enter your password'
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-lg hover:shadow-xl'
          >
            Login as Librarian
          </button>
        </form>

        <div className='mt-6 text-center text-sm text-gray-600'>
          <p>Demo Credentials:</p>
          <p>Email: librarian@example.com</p>
          <p>Password: password123</p>
        </div>
      </div>
    </div>
  )
}

export default LibrarianLogin