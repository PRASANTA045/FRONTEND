import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star } from "lucide-react";
import type { Course } from "@/data/mockCourses";

export interface CourseCardProps {
  course: {
    id: number;
    title: string;
    description: string;
    category: string;
    level: string;
    duration: string;
    students: number;
    rating: number;
    instructor: string;
    price: number;
    image: string;
    mode?: string; // optional, if you want
  };
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Link to={`/course/${course.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-[var(--shadow-hover)] cursor-pointer group">
        <div className="aspect-video overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-5">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="secondary" className="capitalize">
              {course.category}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {course.level}
            </Badge>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-card-foreground line-clamp-2">
            {course.title}
          </h3>
          <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {course.duration}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {course.students}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              {course.rating}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-5">
          <p className="text-sm text-muted-foreground">
            by {course.instructor}
          </p>
          <p className="text-lg font-bold text-primary">₹{course.price}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
