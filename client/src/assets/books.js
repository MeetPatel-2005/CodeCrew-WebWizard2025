// Import book cover images from assets2/books
import atomicHabits from '../assets2/books/Atomic_habits.jpg'
import girlStop from '../assets2/books/girl-stop.png'
import rideLifetime from '../assets2/books/ride-lifetime.png'
import youngBucks from '../assets2/books/young-bucks.png'
import youngBucks2 from '../assets2/books/young-bucks-2.png'
import book1 from '../assets2/books/book-1.png'
import book2 from '../assets2/books/book-2.png'
import book3 from '../assets2/books/book-3.png'
import book4 from '../assets2/books/book-4.png'
import book5 from '../assets2/books/book-5.png'
import book6 from '../assets2/books/book-6.png'
import book7 from '../assets2/books/book-7.png'
import book8 from '../assets2/books/book-8.png'
import book9 from '../assets2/books/book-9.png'
import book10 from '../assets2/books/book-10.png'

// Sample books data for all categories with 2-3 books each
export const sampleBooks = [
  // Fiction (3 books)
  {
    _id: 'fiction_1',
    title: 'The Great Adventure',
    author: 'Jane Smith',
    category: 'Fiction',
    image: atomicHabits,
    publishedYear: 2023,
    isbn: '978-0-123456-78-9',
    copies: 5,
    description: 'A thrilling tale of courage and discovery in a magical world.',
    availability: 'Available'
  },
  {
    _id: 'fiction_2',
    title: 'Mystery of the Lost City',
    author: 'John Doe',
    category: 'Fiction',
    image: girlStop,
    publishedYear: 2022,
    isbn: '978-0-234567-89-1',
    copies: 3,
    description: 'An intriguing mystery set in an ancient civilization.',
    availability: 'Available'
  },
  {
    _id: 'fiction_3',
    title: 'Love Beyond Time', 
    author: 'Sarah Johnson',
    category: 'Fiction',
    image: rideLifetime,
    publishedYear: 2023,
    isbn: '978-0-345678-90-2',
    copies: 4,
    description: 'A romantic story that transcends the boundaries of time.',
    availability: 'Available'
  },

  // Non-Fiction (3 books)
  {
    _id: 'nonfiction_1',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Non-Fiction',
    image: atomicHabits,
    publishedYear: 2018,
    isbn: '978-0-735211-29-9',
    copies: 8,
    description: 'A comprehensive guide to building good habits and breaking bad ones.',
    availability: 'Available'
  },
  {
    _id: 'nonfiction_2',
    title: 'Girl, Stop Apologizing',
    author: 'Rachel Hollis',
    category: 'Non-Fiction',
    image: girlStop,
    publishedYear: 2019,
    isbn: '978-1-400201-92-4',
    copies: 6,
    description: 'A powerful guide to achieving your dreams and goals.',
    availability: 'Available'
  },
  {
    _id: 'nonfiction_3',
    title: 'The Ride of a Lifetime',
    author: 'Robert Iger',
    category: 'Non-Fiction',
    image: rideLifetime,
    publishedYear: 2019,
    isbn: '978-0-399592-09-5',
    copies: 4,
    description: 'Leadership lessons from 15 years as CEO of The Walt Disney Company.',
    availability: 'Available'
  },

  // Science (2 books)
  {
    _id: 'science_1',
    title: 'Cosmos: Exploring the Universe',
    author: 'Neil deGrasse Tyson',
    category: 'Science',
    image: book1,
    publishedYear: 2021,
    isbn: '978-0-456789-01-3',
    copies: 5,
    description: 'A comprehensive journey through space and time.',
    availability: 'Available'
  },
  {
    _id: 'science_2',
    title: 'The Gene: An Intimate History',
    author: 'Siddhartha Mukherjee',
    category: 'Science',
    image: book2,
    publishedYear: 2020,
    isbn: '978-0-567890-12-4',
    copies: 3,
    description: 'An exploration of genetics and its impact on humanity.',
    availability: 'Available'
  },

  // Technology (2 books)
  {
    _id: 'tech_1',
    title: 'The Future of AI',
    author: 'Dr. Lisa Chen',
    category: 'Technology',
    image: book3,
    publishedYear: 2023,
    isbn: '978-0-678901-23-5',
    copies: 4,
    description: 'Understanding artificial intelligence and its implications.',
    availability: 'Available'
  },
  {
    _id: 'tech_2',
    title: 'Digital Revolution',
    author: 'Mark Johnson',
    category: 'Technology',
    image: book4,
    publishedYear: 2022,
    isbn: '978-0-789012-34-6',
    copies: 6,
    description: 'How technology is reshaping our world.',
    availability: 'Available'
  },

  // History (2 books)
  {
    _id: 'history_1',
    title: 'Ancient Civilizations',
    author: 'Prof. David Wilson',
    category: 'History',
    image: book5,
    publishedYear: 2021,
    isbn: '978-0-890123-45-7',
    copies: 5,
    description: 'A comprehensive look at ancient world civilizations.',
    availability: 'Available'
  },
  {
    _id: 'history_2',
    title: 'Modern World Wars',
    author: 'Dr. Emily Brown',
    category: 'History',
    image: book6,
    publishedYear: 2020,
    isbn: '978-0-901234-56-8',
    copies: 3,
    description: 'Analysis of major conflicts in the 20th century.',
    availability: 'Available'
  },

  // Biography (2 books)
  {
    _id: 'bio_1',
    title: 'Steve Jobs: The Visionary',
    author: 'Michael Anderson',
    category: 'Biography',
    image: book7,
    publishedYear: 2022,
    isbn: '978-0-012345-67-9',
    copies: 4,
    description: 'The inspiring life story of Apple\'s co-founder.',
    availability: 'Available'
  },
  {
    _id: 'bio_2',
    title: 'Marie Curie: Pioneer Scientist',
    author: 'Dr. Jennifer White',
    category: 'Biography',
    image: book8,
    publishedYear: 2021,
    isbn: '978-0-123456-78-0',
    copies: 5,
    description: 'The remarkable life of the Nobel Prize winner.',
    availability: 'Available'
  },

  // Literature (2 books)
  {
    _id: 'lit_1',
    title: 'Modern Poetry Collection',
    author: 'Various Authors',
    category: 'Literature',
    image: book9,
    publishedYear: 2023,
    isbn: '978-0-234567-89-1',
    copies: 6,
    description: 'A curated collection of contemporary poetry.',
    availability: 'Available'
  },
  {
    _id: 'lit_2',
    title: 'Classic Short Stories',
    author: 'Various Authors',
    category: 'Literature',
    image: book10,
    publishedYear: 2022,
    isbn: '978-0-345678-90-2',
    copies: 4,
    description: 'Timeless short stories from renowned authors.',
    availability: 'Available'
  },

  // Philosophy (2 books)
  {
    _id: 'phil_1',
    title: 'Ethics in the Modern World',
    author: 'Dr. Robert Green',
    category: 'Philosophy',
    image: youngBucks,
    publishedYear: 2023,
    isbn: '978-0-456789-01-3',
    copies: 3,
    description: 'Exploring moral philosophy in contemporary society.',
    availability: 'Available'
  },
  {
    _id: 'phil_2',
    title: 'The Meaning of Life',
    author: 'Prof. Sarah Davis',
    category: 'Philosophy',
    image: youngBucks2,
    publishedYear: 2022,
    isbn: '978-0-567890-12-4',
    copies: 5,
    description: 'Philosophical perspectives on existence and purpose.',
    availability: 'Available'
  },

  // Arts (2 books)
  {
    _id: 'arts_1',
    title: 'Renaissance Masterpieces',
    author: 'Dr. Maria Lopez',
    category: 'Arts',
    image: book1,
    publishedYear: 2021,
    isbn: '978-0-678901-23-5',
    copies: 4,
    description: 'Exploring the greatest artworks of the Renaissance period.',
    availability: 'Available'
  },
  {
    _id: 'arts_2',
    title: 'Modern Abstract Art',
    author: 'James Miller',
    category: 'Arts',
    image: book2,
    publishedYear: 2022,
    isbn: '978-0-789012-34-6',
    copies: 6,
    description: 'Understanding contemporary abstract art movements.',
    availability: 'Available'
  },

  // Business (2 books)
  {
    _id: 'biz_1',
    title: 'Young Bucks: Building Wealth',
    author: 'Financial Experts',
    category: 'Business',
    image: youngBucks,
    publishedYear: 2023,
    isbn: '978-0-890123-45-7',
    copies: 7,
    description: 'A guide to building wealth and financial success.',
    availability: 'Available'
  },
  {
    _id: 'biz_2',
    title: 'Startup Success Stories',
    author: 'Dr. Kevin Park',
    category: 'Business',
    image: rideLifetime,
    publishedYear: 2022,
    isbn: '978-0-901234-56-8',
    copies: 5,
    description: 'Learning from successful entrepreneurs and their journeys.',
    availability: 'Available'
  },

  // Health (2 books)
  {
    _id: 'health_1',
    title: 'Mind-Body Wellness',
    author: 'Dr. Amanda Thompson',
    category: 'Health',
    image: book3,
    publishedYear: 2023,
    isbn: '978-0-012345-67-9',
    copies: 6,
    description: 'Holistic approaches to physical and mental health.',
    availability: 'Available'
  },
  {
    _id: 'health_2',
    title: 'Nutrition Essentials',
    author: 'Prof. John Martinez',
    category: 'Health',
    image: book4,
    publishedYear: 2022,
    isbn: '978-0-123456-78-0',
    copies: 4,
    description: 'Understanding proper nutrition for optimal health.',
    availability: 'Available'
  },

  // Education (2 books)
  {
    _id: 'edu_1',
    title: 'Learning in the Digital Age',
    author: 'Dr. Susan Lee',
    category: 'Education',
    image: book5,
    publishedYear: 2023,
    isbn: '978-0-234567-89-1',
    copies: 5,
    description: 'Modern educational methods and technologies.',
    availability: 'Available'
  },
  {
    _id: 'edu_2',
    title: 'Critical Thinking Skills',
    author: 'Prof. Michael Taylor',
    category: 'Education',
    image: book6,
    publishedYear: 2022,
    isbn: '978-0-345678-90-2',
    copies: 3,
    description: 'Developing analytical and critical thinking abilities.',
    availability: 'Available'
  },

  // Reference (2 books)
  {
    _id: 'ref_1',
    title: 'Modern Encyclopedia',
    author: 'Editorial Team',
    category: 'Reference',
    image: book7,
    publishedYear: 2023,
    isbn: '978-0-456789-01-3',
    copies: 2,
    description: 'Comprehensive reference guide to contemporary knowledge.',
    availability: 'Available'
  },
  {
    _id: 'ref_2',
    title: 'Dictionary of Science Terms',
    author: 'Dr. Patricia Wilson',
    category: 'Reference',
    image: book8,
    publishedYear: 2022,
    isbn: '978-0-567890-12-4',
    copies: 4,
    description: 'Essential scientific terminology and definitions.',
    availability: 'Available'
  },

  // Children (2 books)
  {
    _id: 'child_1',
    title: 'Adventures in Wonderland',
    author: 'Mary Johnson',
    category: 'Children',
    image: book9,
    publishedYear: 2023,
    isbn: '978-0-678901-23-5',
    copies: 8,
    description: 'Magical adventures perfect for young readers.',
    availability: 'Available'
  },
  {
    _id: 'child_2',
    title: 'Learning with Fun',
    author: 'Dr. Emma Davis',
    category: 'Children',
    image: book10,
    publishedYear: 2022,
    isbn: '978-0-789012-34-6',
    copies: 6,
    description: 'Educational stories that make learning enjoyable.',
    availability: 'Available'
  },

  // Young Adult (2 books)
  {
    _id: 'ya_1',
    title: 'Teen Heroes: Rising Up',
    author: 'Alex Rodriguez',
    category: 'Young Adult',
    image: youngBucks2,
    publishedYear: 2023,
    isbn: '978-0-890123-45-7',
    copies: 7,
    description: 'Inspiring stories of young people making a difference.',
    availability: 'Available'
  },
  {
    _id: 'ya_2',
    title: 'Coming of Age Chronicles',
    author: 'Jessica Brown',
    category: 'Young Adult',
    image: book1,
    publishedYear: 2022,
    isbn: '978-0-901234-56-8',
    copies: 5,
    description: 'Relatable stories about growing up and finding yourself.',
    availability: 'Available'
  }
];

// Categories for filtering
export const categories = [
  'All',
  'Fiction',
  'Non-Fiction', 
  'Science',
  'Technology',
  'History',
  'Biography',
  'Literature',
  'Philosophy',
  'Arts',
  'Business',
  'Health',
  'Education',
  'Reference',
  'Children',
  'Young Adult'
];

export const bookCategories = categories;

export default sampleBooks;