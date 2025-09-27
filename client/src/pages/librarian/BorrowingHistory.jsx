import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const BorrowingHistory = () => {
  const { axios } = useAppContext()
  const [borrowings, setBorrowings] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [filteredBorrowings, setFilteredBorrowings] = useState([])

  useEffect(() => {
    fetchBorrowings()
  }, [])

  useEffect(() => {
    let filtered = borrowings

    if (searchTerm) {
      filtered = filtered.filter(borrowing =>
        borrowing.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        borrowing.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        borrowing.userId?.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        borrowing.bookId?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        borrowing.bookId?.author?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(borrowing => borrowing.status === statusFilter)
    }

    setFilteredBorrowings(filtered)
  }, [borrowings, searchTerm, statusFilter])

  const fetchBorrowings = async () => {
    try {
      const { data } = await axios.get('/api/borrowing/all')
      if (data.success) {
        setBorrowings(data.borrowings)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Failed to fetch borrowing history')
    } finally {
      setLoading(false)
    }
  }

  const updateOverdueStatus = async () => {
    try {
      const { data } = await axios.post('/api/borrowing/update-overdue')
      if (data.success) {
        toast.success('Overdue status updated')
        fetchBorrowings()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Failed to update overdue status')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getDaysOverdue = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = today - due
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'borrowed':
        return 'bg-blue-100 text-blue-800'
      case 'returned':
        return 'bg-green-100 text-green-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center py-16'>
        <div className='animate-spin text-4xl mb-4'>📚</div>
        <p>Loading borrowing history...</p>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold text-gray-800 mb-2'>Borrowing History</h1>
          <p className='text-gray-600'>Track all book borrowings and returns</p>
        </div>
        <button
          onClick={updateOverdueStatus}
          className='px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors'
        >
          Update Overdue Status
        </button>
      </div>

      {/* Search and Filter */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6'>
        <div className='flex flex-col lg:flex-row gap-4'>
          <div className='flex-1'>
            <input
              type='text'
              placeholder='Search by student name, email, student ID, or book title...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none'
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none'
            >
              <option value='All'>All Status</option>
              <option value='borrowed'>Borrowed</option>
              <option value='returned'>Returned</option>
              <option value='overdue'>Overdue</option>
            </select>
          </div>
          <div className='text-sm text-gray-600 flex items-center'>
            {filteredBorrowings.length} record{filteredBorrowings.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
          <div className='text-2xl font-bold text-blue-600'>
            {borrowings.filter(b => b.status === 'borrowed').length}
          </div>
          <div className='text-sm text-blue-600'>Currently Borrowed</div>
        </div>
        <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
          <div className='text-2xl font-bold text-red-600'>
            {borrowings.filter(b => b.status === 'overdue').length}
          </div>
          <div className='text-sm text-red-600'>Overdue Books</div>
        </div>
        <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
          <div className='text-2xl font-bold text-green-600'>
            {borrowings.filter(b => b.status === 'returned').length}
          </div>
          <div className='text-sm text-green-600'>Returned Books</div>
        </div>
        <div className='bg-orange-50 border border-orange-200 rounded-lg p-4'>
          <div className='text-2xl font-bold text-orange-600'>
            ${borrowings.reduce((total, b) => total + (b.fine || 0), 0).toFixed(2)}
          </div>
          <div className='text-sm text-orange-600'>Total Fines</div>
        </div>
      </div>

      {/* Borrowings Table */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Student</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Book</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Borrow Date</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Due Date</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Return Date</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Status</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Fine</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredBorrowings.map((borrowing) => (
                <tr key={borrowing._id} className='hover:bg-gray-50'>
                  <td className='py-4 px-4'>
                    <div>
                      <div className='font-medium text-gray-800'>
                        {borrowing.userId?.name || 'N/A'}
                      </div>
                      <div className='text-sm text-gray-600'>
                        {borrowing.userId?.studentId}
                      </div>
                      <div className='text-sm text-gray-500'>
                        {borrowing.userId?.email}
                      </div>
                    </div>
                  </td>
                  <td className='py-4 px-4'>
                    <div>
                      <div className='font-medium text-gray-800 line-clamp-2'>
                        {borrowing.bookId?.title || 'N/A'}
                      </div>
                      <div className='text-sm text-gray-600'>
                        by {borrowing.bookId?.author}
                      </div>
                      <div className='text-sm text-gray-500'>
                        ISBN: {borrowing.bookId?.isbn}
                      </div>
                    </div>
                  </td>
                  <td className='py-4 px-4 text-gray-700'>
                    {formatDate(borrowing.borrowDate)}
                  </td>
                  <td className='py-4 px-4'>
                    <div className='text-gray-700'>
                      {formatDate(borrowing.dueDate)}
                    </div>
                    {borrowing.status === 'overdue' && (
                      <div className='text-xs text-red-600 mt-1'>
                        {getDaysOverdue(borrowing.dueDate)} days overdue
                      </div>
                    )}
                  </td>
                  <td className='py-4 px-4 text-gray-700'>
                    {borrowing.returnDate ? formatDate(borrowing.returnDate) : '-'}
                  </td>
                  <td className='py-4 px-4'>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(borrowing.status)}`}>
                      {borrowing.status.charAt(0).toUpperCase() + borrowing.status.slice(1)}
                    </span>
                  </td>
                  <td className='py-4 px-4'>
                    {borrowing.fine > 0 ? (
                      <span className='text-red-600 font-medium'>
                        ${borrowing.fine.toFixed(2)}
                      </span>
                    ) : (
                      <span className='text-gray-400'>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBorrowings.length === 0 && (
            <div className='text-center py-12'>
              <span className='text-8xl mb-4 block'>📖</span>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>No Records Found</h3>
              <p className='text-gray-600'>
                {searchTerm
                  ? `No borrowing records match your search "${searchTerm}"`
                  : 'No borrowing history available'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BorrowingHistory