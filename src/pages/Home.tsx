import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CourseCard from '@/components/CourseCard';
import { mockCourses, categories } from '@/data/mockCourses';
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react';

const Home = () => {
  const featuredCourses = mockCourses.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
              Master New Skills with{' '}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                BALC
              </span>
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Learn Development, Editing, and Design from industry experts. Choose between online and offline modes.
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
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
