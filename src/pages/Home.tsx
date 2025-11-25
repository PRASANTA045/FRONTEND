import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CourseCard from "@/components/CourseCard";
import { mockCourses } from "@/data/mockCourses";
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Phone,
  Mail,
  ShieldCheck,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Linkedin,
  Code,
  PenTool,
  BarChart2,
  Briefcase,
  Activity,
  UserCheck,
  Globe,
  GraduationCap,
  Headphones,
} from "lucide-react";
import { useState, useEffect } from "react";

const slides = [
  { image: "public/images/home1.jpg", caption: "Welcome to BALC — Learn, Grow, and Succeed" },
  { image: "/images/home2.jpg", caption: "Empowering Students with Modern Education" },
  { image: "/images/home3.jpg", caption: "Explore Your Potential with Expert Mentorship" },
];

const categories = [
  { id: "development", name: "Development", icon: <Code /> },
  { id: "design", name: "Design", icon: <PenTool /> },
  { id: "marketing", name: "Marketing", icon: <BarChart2 /> },
  { id: "business", name: "Business", icon: <Briefcase /> },
  { id: "data-science", name: "Data Science", icon: <Activity /> },
  { id: "personal-development", name: "Personal Development", icon: <UserCheck /> },
];

const Home = () => {
  const featuredCourses = mockCourses.slice(0, 3);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Info Bar */}
      <div className="w-full bg-primary text-white py-3 px-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-8 text-sm md:text-base">
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-white" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-white" />
            <span>info@balc.in</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="h-5 w-5 hover:text-pink-400 transition-colors" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <Youtube className="h-5 w-5 hover:text-red-500 transition-colors" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="h-5 w-5 hover:text-blue-500 transition-colors" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="h-5 w-5 hover:text-sky-400 transition-colors" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-5 w-5 hover:text-blue-400 transition-colors" />
          </a>
        </div>
      </div>

      {/* Slide Section */}
      <section className="relative w-full h-[80vh] overflow-hidden rounded-none shadow-lg">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className="text-white text-3xl md:text-5xl font-bold text-center px-4">{slide.caption}</h2>
            </div>
          </div>
        ))}
        <div className="absolute bottom-5 w-full flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === current ? "bg-white scale-125" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
              Master New Skills with{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                BALC
              </span>
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Learn Development, Design, Marketing, Business, Data Science, and Personal Development from industry experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow text-lg h-12 px-8">
                  Explore Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" variant="outline" className="text-lg h-12 px-8">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <h1 className="absolute inset-0 text-[12rem] md:text-[18rem] font-extrabold text-gray-200/10 flex items-center justify-center pointer-events-none select-none z-0">
          BALC
        </h1>
      </section>

      {/* 🌟 Media Links Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Explore Our Media</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/media/event"
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-glow transition"
            >
              Events
            </Link>
            <Link
              to="/media/awards"
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-glow transition"
            >
              Awards
            </Link>
            <Link
              to="/media/gallery"
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-glow transition"
            >
              Gallery
            </Link>
            <Link
              to="/media/press-coverage"
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-glow transition"
            >
              Press Coverage
            </Link>
            <Link
              to="/media/publication"
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-glow transition"
            >
              Publications
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-3xl font-bold mb-2">50+</h3>
                <p className="text-muted-foreground">Quality Courses</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <Users className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-3xl font-bold mb-2">10,000+</h3>
                <p className="text-muted-foreground">Active Students</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <Award className="h-12 w-12 text-primary-glow mb-4" />
                <h3 className="text-3xl font-bold mb-2">95%</h3>
                <p className="text-muted-foreground">Success Rate</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Global Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl mb-4">Our Global Reach</h2>
            <p className="text-lg text-muted-foreground">Trusted worldwide by learners, teachers, and professionals</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">5M+</h3>
              <p className="text-gray-600">Global Followers</p>
            </div>
            <div>
              <GraduationCap className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">20K+</h3>
              <p className="text-gray-600">Enrolled Students</p>
            </div>
            <div>
              <ShieldCheck className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">500+</h3>
              <p className="text-gray-600">Certified Teachers</p>
            </div>
            <div>
              <Headphones className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">24/7</h3>
              <p className="text-gray-600">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Browse by Category</h2>
            <p className="text-lg text-muted-foreground">Find the perfect course for your learning goals</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/courses?category=${category.id}`}>
                <Card className="transition-all hover:shadow-[var(--shadow-hover)] cursor-pointer group">
                  <CardContent className="flex flex-col items-center justify-center p-10 text-center">
                    <span className="text-5xl mb-4">{category.icon}</span>
                    <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold md:text-4xl">Featured Courses</h2>
              <p className="text-lg text-muted-foreground">Start learning with our most popular courses</p>
            </div>
            <Link to="/courses">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={Number(course.id)} course={{...course,id:Number(course.id)}} />
            ))}
          </div>
        </div>
      </section>

      {/* Achievements / Highlights Section */}
      <section className="py-10 bg-black text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
          <div className="flex items-center gap-3">
            <img src="/icons/india-map.webp" alt="India Map" className="w-8 h-8" />
            <span className="text-lg font-semibold">The fastest growing skill development organisation</span>
          </div>
          <div className="flex items-center gap-3">
            <img src="/icons/increase.jpg" alt="Increase" className="w-8 h-8" />
            <span className="text-lg font-semibold">58 franchisees… still increasing</span>
          </div>
          <div className="flex items-center gap-3">
            <img src="/icons/people.jpg" alt="People" className="w-8 h-8" />
            <span className="text-lg font-semibold">Trained over 2 Lakh since 2004</span>
          </div>
          <div className="flex items-center gap-3">
            <img src="/icons/earth.jpg" alt="Earth" className="w-8 h-8" />
            <span className="text-lg font-semibold">17 years of service</span>
          </div>
        </div>
      </section>

      {/* Quick Links + Head Office Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/Contact-Us" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/About-Us" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">BALC Head Office</h2>
            <p>
              #10/15, 1st Floor, G.T.Complex, Sunkadakatte, Magadi Main Road, Bengaluru -560091
            </p>
            <p>Phone: 080-29550482</p>
            <p>Email: info@balc.in</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="bg-blue-600 text-white text-center py-4">
        <p>BALC Copyright© 2020. www.balc.in All right reserved.</p>
      </section>
    </div>
  );
};

export default Home;
