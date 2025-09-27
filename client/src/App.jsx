import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from "react-hot-toast";
import Footer from './components/Footer';
import { useAppContext } from './context/AppContext';
import Login from './components/Login';
import AllBooks from './pages/AllBooks';
import BookCategory from './pages/BookCategory';
import BookDetails from './pages/BookDetails';
import MyBooks from './pages/MyBooks';
import LibrarianLogin from './components/librarian/LibrarianLogin';
import LibrarianLayout from './pages/librarian/LibrarianLayout';
import AddBook from './pages/librarian/AddBook';
import BookList from './pages/librarian/BookList';
import BorrowingHistory from './pages/librarian/BorrowingHistory';
import Loading from './components/Loading';

const App = () => {
  const location = useLocation();
  const isLibrarianPath = location.pathname.includes("librarian") || location.pathname.includes("admin");
  const {showUserLogin, isLibrarian} = useAppContext()

  return (
    <div className='text-default min-h-screen text-gray-700 bg-gradient-to-br from-blue-50 to-indigo-100'>

     {isLibrarianPath ? null : <Navbar/>} 
     {showUserLogin ? <Login/> : null}

     <Toaster position="top-right" />

      <div className={`${isLibrarianPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32 pt-4"}`}>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/books' element={<AllBooks/>} />
          <Route path='/books/:category' element={<BookCategory/>} />
          <Route path='/books/:category/:id' element={<BookDetails/>} />
          <Route path='/my-books' element={<MyBooks/>} />
          <Route path='/loader' element={<Loading/>} />
          <Route path='/librarian' element={isLibrarian ? <LibrarianLayout/> : <LibrarianLogin/>}>
            <Route index element={isLibrarian ? <AddBook/> : null} />
            <Route path='book-list' element={<BookList/>} />
            <Route path='borrowing-history' element={<BorrowingHistory/>} />
          </Route>
          <Route path='/admin' element={isLibrarian ? <LibrarianLayout/> : <LibrarianLogin/>}>
            <Route index element={isLibrarian ? <AddBook/> : null} />
            <Route path='book-list' element={<BookList/>} />
            <Route path='borrowing-history' element={<BorrowingHistory/>} />
          </Route>
        </Routes>
      </div>
     {!isLibrarianPath && <Footer/>}
    </div>
  )
}

export default App
