import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Clock, Users, Star, Award, MapPin } from "lucide-react";
import { toast } from "sonner";
import { getCourseById } from "@/api/courseApi";
import { purchaseCourse } from "@/api/purchaseApi";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [course, setCourse] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedMode, setSelectedMode] = useState<"online" | "offline">(
    "online"
  );
  const [selectedCenter, setSelectedCenter] = useState("");

  useEffect(() => {
    loadCourse();
  }, []);

  const loadCourse = async () => {
    try {
      const res = await getCourseById(id as string);
      setCourse(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Course not found</p>
      </div>
    );
  }

  const handleEnroll = async () => {
    if (!user) {
      toast.error("Please login to enroll");
      navigate("/login");
      return;
    }

    try {
      const payload = {
        courseId: course.id,
        mode: selectedMode,
        centerId: selectedMode === "offline" ? selectedCenter : null,
      };

      await purchaseCourse(payload);

      toast.success("Course purchased successfully!");
    } catch (error) {
      toast.error("Purchase failed");
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT AREA */}
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-video overflow-hidden rounded-lg">
            <img
              src={course.imageUrl}
              alt={course.courseTitle}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2">
              <Badge variant="secondary" className="capitalize">
                {course.category}
              </Badge>

              <Badge variant="outline" className="capitalize">
                {course.level}
              </Badge>
            </div>

            <h1 className="mb-4 text-4xl font-bold">{course.courseTitle}</h1>
            <p className="text-lg text-muted-foreground mb-6">
              {course.description}
            </p>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Students: N/A</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-accent text-accent" />
                <span>4.8 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span>Certificate Included</span>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>About the Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {course.instructor}
                </span>{" "}
                is an experienced professional with deep expertise in{" "}
                {course.category}.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT AREA - Enrollment */}
        <Card className="sticky top-20">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">
              ₹{course.price}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Mode Selection */}
            <div>
              <Label className="text-base font-semibold mb-3 block">
                Select Learning Mode
              </Label>

              <RadioGroup
                value={selectedMode}
                onValueChange={(value: any) => setSelectedMode(value)}
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online" className="flex-1 cursor-pointer">
                    Online Learning
                  </Label>
                </div>

                {course.mode === "both" && (
                  <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer">
                    <RadioGroupItem value="offline" id="offline" />
                    <Label htmlFor="offline" className="flex-1 cursor-pointer">
                      Offline Classes
                    </Label>
                  </div>
                )}
              </RadioGroup>
            </div>

            {/* Coaching Centers (Only if offline) */}
            {selectedMode === "offline" && (
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Select Coaching Center
                </Label>

                <RadioGroup
                  value={selectedCenter}
                  onValueChange={setSelectedCenter}
                  className="space-y-3"
                >
                  {course.centers && course.centers.length > 0 ? (
                    course.centers.map((c: any) => (
                      <div
                        key={c.id}
                        className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer"
                      >
                        <RadioGroupItem
                          value={String(c.id)}
                          id={`center-${c.id}`}
                        />
                        <Label
                          htmlFor={`center-${c.id}`}
                          className="flex-1 cursor-pointer"
                        >
                          <div className="font-semibold">{c.centerName}</div>
                          <div className="text-sm text-muted-foreground">
                            <MapPin className="inline h-4 w-4 mr-1" />
                            {c.address}
                          </div>
                        </Label>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 border rounded-lg">
                      <Label>No centers available</Label>
                    </div>
                  )}
                </RadioGroup>
              </div>
            )}

            <Button
              onClick={handleEnroll}
              className="w-full bg-primary text-lg h-12"
            >
              Enroll Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseDetail;
