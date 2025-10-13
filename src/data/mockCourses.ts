export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'development' | 'editing' | 'design';
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  image: string;
  mode: 'online' | 'offline' | 'both';
  rating: number;
  students: number;
}

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Master full-stack web development with HTML, CSS, JavaScript, React, and Node.js',
    category: 'development',
    instructor: 'John Doe',
    duration: '12 weeks',
    level: 'beginner',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    mode: 'both',
    rating: 4.8,
    students: 1250,
  },
  {
    id: '2',
    title: 'Advanced React & TypeScript',
    description: 'Build scalable applications with React 18, TypeScript, and modern best practices',
    category: 'development',
    instructor: 'Sarah Smith',
    duration: '8 weeks',
    level: 'advanced',
    price: 5999,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    mode: 'online',
    rating: 4.9,
    students: 890,
  },
  {
    id: '3',
    title: 'Video Editing Masterclass',
    description: 'Professional video editing with Adobe Premiere Pro and After Effects',
    category: 'editing',
    instructor: 'Mike Johnson',
    duration: '10 weeks',
    level: 'intermediate',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800',
    mode: 'both',
    rating: 4.7,
    students: 650,
  },
  {
    id: '4',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn user-centered design principles and create stunning interfaces with Figma',
    category: 'design',
    instructor: 'Emma Wilson',
    duration: '6 weeks',
    level: 'beginner',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    mode: 'online',
    rating: 4.8,
    students: 920,
  },
  {
    id: '5',
    title: 'Python for Data Science',
    description: 'Master Python, NumPy, Pandas, and machine learning fundamentals',
    category: 'development',
    instructor: 'David Lee',
    duration: '14 weeks',
    level: 'intermediate',
    price: 5499,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
    mode: 'both',
    rating: 4.9,
    students: 1100,
  },
  {
    id: '6',
    title: 'Motion Graphics & Animation',
    description: 'Create stunning animations and motion graphics for social media and ads',
    category: 'editing',
    instructor: 'Lisa Brown',
    duration: '8 weeks',
    level: 'advanced',
    price: 4499,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
    mode: 'online',
    rating: 4.6,
    students: 540,
  },
];

export const categories = [
  { id: 'development', name: 'Development', icon: '💻' },
  { id: 'editing', name: 'Editing', icon: '🎬' },
  { id: 'design', name: 'Design', icon: '🎨' },
];

export const coachingCenters = [
  { id: '1', name: 'BALC Mumbai Center', address: 'Andheri West, Mumbai', courses: ['1', '3', '5'] },
  { id: '2', name: 'BALC Delhi Center', address: 'Connaught Place, Delhi', courses: ['1', '3', '5'] },
  { id: '3', name: 'BALC Bangalore Center', address: 'Koramangala, Bangalore', courses: ['1', '3', '5'] },
];
