const NewsLetter = () => {
    
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-2 mt-24 pb-14">
            <h1 className="md:text-4xl text-2xl font-semibold text-gray-800">Stay Updated with New Books!</h1>
            <p className="md:text-lg text-gray-500/70 pb-8">
                Subscribe to get the latest book arrivals, featured collections, and library updates
            </p>
            <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
                <input
                    className="border border-indigo-200 rounded-l-md h-full outline-none w-full px-3 text-gray-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    type="email"
                    placeholder="Enter your email address"
                    required
                />
                <button type="submit" className="md:px-12 px-8 h-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all cursor-pointer rounded-r-md font-medium shadow-md">
                    Subscribe
                </button>
            </form>
        </div>
    )
}

export default NewsLetter