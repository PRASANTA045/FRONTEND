import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getAllCourses } from "@/api/courseApi";

const allCategories = [
  { id: "development", name: "Development", icon: "💻" },
  { id: "design", name: "Design", icon: "🎨" },
  { id: "editing", name: "Editing", icon: "✂️" },
];

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const selectedCategory = searchParams.get("category") || "all";

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const res = await getAllCourses();
        setCourses(res.data);
      } catch (error) {
        console.error("Failed to load courses");
      }
    };
    loadCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;

    const matchesSearch =
      course.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">All Courses</h1>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSearchParams({})}
          >
            All Courses
          </Button>

          {allCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSearchParams({ category: category.id })}
            >
              {category.icon} {category.name}
            </Button>
          ))}
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((c) => (
              <CourseCard
                key={c.id}
                course={{
                  id: c.id,
                  title: c.courseTitle,
                  description: c.description,
                  category: c.category,
                  instructor: c.instructor,
                  duration: c.duration,
                  level: c.level,
                  price: c.price,
                  image: c.imageUrl,
                  mode: c.mode,
                  rating: 4.8,
                  students: 500,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            No courses found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
