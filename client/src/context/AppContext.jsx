// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { dummyProducts } from "../assets/assets";
// import toast from "react-hot-toast";
// import axios from "axios";

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// export const AppContext = createContext();

// export const AppContextProvider = ({children})=>{

//     const currency = import.meta.env.VITE_CURRENCY;

//     const navigate = useNavigate();
//     const [user, setUser] = useState(null)
//     const [isSeller, setIsSeller] = useState(false)
//     const [showUserLogin, setShowUserLogin] = useState(false)
//     const [products, setProducts] = useState([])

//     const [cartItems, setCartItems] = useState({})
//     const [searchQuery, setSearchQuery] = useState({})

//   // Fetch Seller Status
//   const fetchSeller = async ()=>{
//     try {
//         const {data} = await axios.get('/api/seller/is-auth');
//         if(data.success){
//             setIsSeller(true)
//         }else{
//             setIsSeller(false)
//         }
//     } catch (error) {
//         setIsSeller(false)
//     }
//   }

//     // Fetch User Auth Status , User Data and Cart Items
// const fetchUser = async ()=>{
//     try {
//         const {data} = await axios.get('api/user/is-auth');
//         if (data.success){
//             setUser(data.user)
//             setCartItems(data.user.cartItems)
//         }
//     } catch (error) {
//         setUser(null)
//     }
// }



//     // Fetch All Products
//     const fetchProducts = async ()=>{
//         try {
//             const { data } = await axios.get('/api/product/list')
//             if(data.success){
//                 setProducts(data.products)
//             }else{
//                 toast.error(data.message)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

// // Add Product to Cart
// const addToCart = (itemId)=>{
//     let cartData = structuredClone(cartItems);

//     if(cartData[itemId]){
//         cartData[itemId] += 1;
//     }else{
//         cartData[itemId] = 1;
//     }
//     setCartItems(cartData);
//     toast.success("Added to Cart")
// }

//   // Update Cart Item Quantity
//   const updateCartItem = (itemId, quantity)=>{
//     let cartData = structuredClone(cartItems);
//     cartData[itemId] = quantity;
//     setCartItems(cartData)
//     toast.success("Cart Updated")
//   }

// // Remove Product from Cart
// const removeFromCart = (itemId)=>{
//     let cartData = structuredClone(cartItems);
//     if(cartData[itemId]){
//         cartData[itemId] -= 1;
//         if(cartData[itemId] === 0){
//             delete cartData[itemId];
//         }
//     }
//     toast.success("Removed from Cart")
//     setCartItems(cartData)
// }

//   // Get Cart Item Count
//   const getCartCount = ()=>{
//     let totalCount = 0;
//     for(const item in cartItems){
//         totalCount += cartItems[item];
//     }
//     return totalCount;
//   }

// // Get Cart Total Amount
// const getCartAmount = () =>{
//     let totalAmount = 0;
//     for (const items in cartItems){
//         let itemInfo = products.find((product)=> product._id === items);
//         if(cartItems[items] > 0){
//             totalAmount += itemInfo.offerPrice * cartItems[items]
//         }
//     }
//     return Math.floor(totalAmount * 100) / 100;
// }


//     useEffect(()=>{
//         fetchUser()
//         fetchSeller()
//         fetchProducts()
//     },[])

//     // Update Database Cart Items
//     useEffect(()=>{
//         const updateCart = async ()=>{
//             try {
//                 const { data } = await axios.post('/api/cart/update', {cartItems})
//                 if (!data.success){
//                     toast.error(data.message)
//                 }
//             } catch (error) {
//                 toast.error(error.message)
//             }
//         }

//         if(user){
//             updateCart()
//         }
//     },[cartItems])

//     const value = {navigate, user, setUser, setIsSeller, isSeller,
//         showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart, cartItems, searchQuery, setSearchQuery, getCartAmount, getCartCount, axios, fetchProducts, setCartItems
//     }

//     return <AppContext.Provider value={value}>
//         {children}
//     </AppContext.Provider>
// }

// export const useAppContext = ()=>{
//     return useContext(AppContext)
// }

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sampleBooks } from "../assets/books";
import toast from "react-hot-toast";
import axios from "axios";

// ✅ Set Axios global config
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLibrarian, setIsLibrarian] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Fetch User Auth Status and User Data
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      setUser(null);
    }
  };

  // ✅ Fetch All Books
  const fetchBooks = async () => {
    try {
      const { data } = await axios.get("/api/book/list");
      if (data.success) {
        setBooks(data.books);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      // Use sample books as fallback for development
      setBooks(sampleBooks);
    }
  };

  // ✅ Fetch User's Borrowed Books
  const fetchBorrowedBooks = async () => {
    try {
      const { data } = await axios.get("/api/borrowing/my-books");
      if (data.success) {
        setBorrowedBooks(data.borrowings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setBorrowedBooks([]);
    }
  };

  // ✅ Borrow Book
  const borrowBook = async (bookId) => {
    try {
      console.log('📚 Attempting to borrow book:', bookId);
      console.log('👤 Current user:', user);
      
      if (!user) {
        toast.error("Please login to borrow books");
        setShowUserLogin(true);
        return false;
      }

      const { data } = await axios.post("/api/borrowing/borrow", { bookId });
      console.log('📝 Borrow response:', data);
      
      if (data.success) {
        toast.success("Book borrowed successfully!");
        fetchBooks(); // Refresh books list
        fetchBorrowedBooks(); // Refresh borrowed books
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      console.error('❌ Borrow error:', error);
      toast.error(error.response?.data?.message || error.message);
      return false;
    }
  };

  // ✅ Return Book
  const returnBook = async (borrowingId) => {
    try {
      const { data } = await axios.post("/api/borrowing/return", { borrowingId });
      if (data.success) {
        toast.success(data.message);
        fetchBooks(); // Refresh books list
        fetchBorrowedBooks(); // Refresh borrowed books
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  // ✅ Renew Book
  const renewBook = async (borrowingId) => {
    try {
      const { data } = await axios.post("/api/borrowing/renew", { borrowingId });
      if (data.success) {
        toast.success("Book renewed successfully!");
        fetchBorrowedBooks(); // Refresh borrowed books
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  // ✅ Initial Data Load
  useEffect(() => {
    fetchUser();
    fetchBooks();
  }, []);

  // ✅ Debug logging
  useEffect(() => {
    console.log('📚 Books loaded:', books.length);
    console.log('👤 User:', user?.name || 'Not logged in');
  }, [books, user]);

  // ✅ Fetch borrowed books when user is available
  useEffect(() => {
    if (user) {
      fetchBorrowedBooks();
    }
  }, [user]);

  const value = {
    navigate,
    user,
    setUser,
    isLibrarian,
    setIsLibrarian,
    showUserLogin,
    setShowUserLogin,
    books,
    borrowedBooks,
    searchQuery,
    setSearchQuery,
    borrowBook,
    returnBook,
    renewBook,
    axios,
    fetchBooks,
    fetchBorrowedBooks,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};

