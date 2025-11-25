import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  fullContent: string;
  image: string;
  category: string;
  date: string;
  author: string;
}

const mockBlogs: BlogPost[] = [
  {
    id: "1",
    title: "How BALC Empowers Students With Modern Skills",
    description: "Discover how BALC provides industry-ready courses...",
    fullContent:
      "BALC has been empowering students for years by providing hands-on training, expert guidance, and digital learning...",
    image: "/images/iron.jpg",
    category: "Education",
    date: "Nov 22, 2025",
    author: "Admin",
  },
  {
    id: "2",
    title: "Top 5 Career Paths After Computer Courses",
    description: "A detailed guide for high-demand career options...",
    fullContent:
      "After completing computer-related courses, students can explore careers like software development, UI/UX design...",
    image: "/images/me.jpg",
    category: "Career",
    date: "Nov 20, 2025",
    author: "BALC Team",
  },
  {
    id: "3",
    title: "Why Every Student Should Learn Basic Programming",
    description: "Programming improves logic and problem-solving.",
    fullContent:
      "Learning programming has become an essential skill in modern industries. It boosts analytical thinking...",
    image: "/images/home1.jpg",
    category: "Technology",
    date: "Nov 18, 2025",
    author: "Instructor Rahul",
  },
];

export default function BlogsDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    const foundBlog = mockBlogs.find((b) => b.id === id);
    setBlog(foundBlog || null);
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Blog not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <Card className="shadow-xl">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-72 object-cover rounded-t-xl"
          />

          <CardContent className="p-6">
            <p className="text-blue-600 font-semibold mb-2">{blog.category}</p>
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

            <p className="text-sm text-gray-500 mb-6">
              {blog.date} • {blog.author}
            </p>

            <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
              {blog.fullContent}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
