const Footer = () => {
    const libraryLinks = {
        'Quick Links': [
            { text: 'Browse Books', url: '/books' },
            { text: 'My Books', url: '/my-books' },
            { text: 'Categories', url: '/books' },
            { text: 'New Arrivals', url: '/books' }
        ],
        'Library Info': [
            { text: 'About Us', url: '#' },
            { text: 'Contact', url: '#' },
            { text: 'Library Rules', url: '#' },
            { text: 'FAQ', url: '#' }
        ],
        'Support': [
            { text: 'Help Center', url: '#' },
            { text: 'Report Issue', url: '#' },
            { text: 'Feedback', url: '#' },
            { text: 'Terms of Service', url: '#' }
        ]
    }

    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-gradient-to-r from-indigo-50 to-purple-50">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-indigo-200 text-gray-600">
                <div className="max-w-md">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">📚</span>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            LibraryMS
                        </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                        Your digital library companion. Discover, borrow, and manage books seamlessly. 
                        Empowering students and book lovers with easy access to knowledge and literature.
                    </p>
                    <div className="flex items-center gap-4 mt-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-indigo-600">1000+</div>
                            <div className="text-xs text-gray-500">Books</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">500+</div>
                            <div className="text-xs text-gray-500">Members</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">15</div>
                            <div className="text-xs text-gray-500">Categories</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[50%] gap-8">
                    {Object.entries(libraryLinks).map(([title, links], index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-gray-800 mb-4">{title}</h3>
                            <ul className="text-sm space-y-2">
                                {links.map((link, i) => (
                                    <li key={i}>
                                        <a href={link.url} className="hover:text-indigo-600 transition-colors duration-200">
                                            {link.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="py-6 text-center">
                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} LibraryMS. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Footer