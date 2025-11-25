import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "Top 5 Digital Skills You Must Learn in 2025",
      date: "Jan 10, 2025",
      image: "/images/blog1.jpg",
    },
    {
      id: 2,
      title: "How BALC Prepares Students for Real Industry Jobs",
      date: "Feb 02, 2025",
      image: "/images/blog2.jpg",
    },
    {
      id: 3,
      title: "Why Skill Development is the Future of Education in India",
      date: "Mar 18, 2025",
      image: "/images/blog3.jpg",
    },
    {
      id: 4,
      title: "Best Career Courses After 12th for High-Growth Jobs",
      date: "Apr 04, 2025",
      image: "/images/blog4.jpg",
    },
    {
      id: 5,
      title: "The Importance of Practical Training Over Theory",
      date: "May 20, 2025",
      image: "/images/blog5.jpg",
    },
    {
      id: 6,
      title: "How to Start a Career in Graphic Design",
      date: "Jun 11, 2025",
      image: "/images/blog6.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/40 py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-6">BALC Blog</h1>

        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
          Read articles on digital skills, career development, technology trends, and insights from BALC experts.
        </p>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden shadow-lg rounded-2xl">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-52 object-cover"
              />
              <CardContent className="p-6">
                <div className="flex items-center text-sm text-muted-foreground gap-2 mb-2">
                  <Calendar className="w-4 h-4" /> {post.date}
                </div>
                <h3 className="text-xl font-semibold mb-4">{post.title}</h3>
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-primary font-medium hover:underline"
                >
                  Read More <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}