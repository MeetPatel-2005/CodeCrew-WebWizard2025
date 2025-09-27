import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {

    const {setShowUserLogin, setUser, axios, navigate} = useAppContext()

    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [studentId, setStudentId] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");

    const onSubmitHandler = async (event)=>{
        try {
            event.preventDefault();

            const requestData = state === "register" 
                ? { name, email, password, studentId, phoneNumber }
                : { email, password };

            const {data} = await axios.post(`/api/user/${state}`, requestData);
            
            if (data.success){
                navigate('/')
                setUser(data.user)
                setShowUserLogin(false)
                toast.success(state === "register" ? "Account created successfully!" : "Welcome back!")
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div onClick={()=> setShowUserLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50'>

      <form onSubmit={onSubmitHandler} onClick={(e)=>e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[400px] rounded-lg shadow-xl border border-indigo-200 bg-white max-h-[90vh] overflow-y-auto">
            <div className="w-full text-center mb-2">
                <div className="text-3xl mb-2">📚</div>
                <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Student {state === "login" ? "Login" : "Registration"}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                    {state === "login" ? "Access your library account" : "Join our library community"}
                </p>
            </div>
            
            {state === "register" && (
                <>
                    <div className="w-full">
                        <p className="font-medium text-gray-700">Full Name</p>
                        <input 
                            onChange={(e) => setName(e.target.value)} 
                            value={name} 
                            placeholder="Enter your full name" 
                            className="border border-gray-300 rounded-lg w-full p-3 mt-1 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                            type="text" 
                            required 
                        />
                    </div>
                    <div className="w-full">
                        <p className="font-medium text-gray-700">Student ID</p>
                        <input 
                            onChange={(e) => setStudentId(e.target.value)} 
                            value={studentId} 
                            placeholder="Enter your student ID" 
                            className="border border-gray-300 rounded-lg w-full p-3 mt-1 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                            type="text" 
                            required 
                        />
                    </div>
                    <div className="w-full">
                        <p className="font-medium text-gray-700">Phone Number</p>
                        <input 
                            onChange={(e) => setPhoneNumber(e.target.value)} 
                            value={phoneNumber} 
                            placeholder="Enter your phone number" 
                            className="border border-gray-300 rounded-lg w-full p-3 mt-1 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                            type="tel" 
                            required 
                        />
                    </div>

                </>
            )}
            <div className="w-full">
                <p className="font-medium text-gray-700">Email</p>
                <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                    placeholder="Enter your email" 
                    className="border border-gray-300 rounded-lg w-full p-3 mt-1 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                    type="email" 
                    required 
                />
            </div>
            <div className="w-full">
                <p className="font-medium text-gray-700">Password</p>
                <input 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} 
                    placeholder="Enter your password" 
                    className="border border-gray-300 rounded-lg w-full p-3 mt-1 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                    type="password" 
                    required 
                />
            </div>
            {state === "register" ? (
                <p className="text-sm text-gray-600">
                    Already have an account? <span onClick={() => setState("login")} className="text-indigo-600 cursor-pointer hover:text-indigo-700 font-medium">Login here</span>
                </p>
            ) : (
                <p className="text-sm text-gray-600">
                    New to our library? <span onClick={() => setState("register")} className="text-indigo-600 cursor-pointer hover:text-indigo-700 font-medium">Register here</span>
                </p>
            )}
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all text-white w-full py-3 rounded-lg cursor-pointer font-medium shadow-md hover:shadow-lg">
                {state === "register" ? "Create Student Account" : "Login to Library"}
            </button>
        </form>
    </div>
  )
}

export default Login
