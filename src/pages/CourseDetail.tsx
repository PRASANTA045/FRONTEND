import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { mockCourses, coachingCenters } from '@/data/mockCourses';
import { Clock, Users, Star, Award, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedMode, setSelectedMode] = useState<'online' | 'offline'>('online');
  const [selectedCenter, setSelectedCenter] = useState('');

  const course = mockCourses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Course not found</p>
      </div>
    );
  }

  const availableCenters = coachingCenters.filter((center) =>
    center.courses.includes(course.id)
  );

  const handleEnroll = () => {
    if (!user) {
      toast.error('Please login to enroll');
      navigate('/login');
      return;
    }

    if (selectedMode === 'offline' && !selectedCenter) {
      toast.error('Please select a coaching center');
      return;
    }

    if (selectedMode === 'online') {
      toast.success('Redirecting to payment gateway...');
      // In production, redirect to actual payment gateway
      setTimeout(() => {
        toast.success('Enrolled successfully! Course access granted.');
      }, 2000);
    } else {
      toast.success('Enrollment request submitted! We will contact you shortly.');
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video overflow-hidden rounded-lg">
              <img
                src={course.image}
                alt={course.title}
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
              <h1 className="mb-4 text-4xl font-bold">{course.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{course.description}</p>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span>{course.rating} rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Certificate included</span>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>About the Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{course.instructor}</span> is an experienced educator with years of industry experience in {course.category}.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Enrollment Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-primary">₹{course.price}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-3 block">Select Learning Mode</Label>
                  <RadioGroup value={selectedMode} onValueChange={(value: any) => setSelectedMode(value)}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-secondary cursor-pointer">
                      <RadioGroupItem value="online" id="online" />
                      <Label htmlFor="online" className="flex-1 cursor-pointer">
                        Online Learning
                      </Label>
                    </div>
                    {course.mode === 'both' && (
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-secondary cursor-pointer">
                        <RadioGroupItem value="offline" id="offline" />
                        <Label htmlFor="offline" className="flex-1 cursor-pointer">
                          Offline Classes
                        </Label>
                      </div>
                    )}
                  </RadioGroup>
                </div>

                {selectedMode === 'offline' && course.mode === 'both' && (
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Select Coaching Center</Label>
                    <RadioGroup value={selectedCenter} onValueChange={setSelectedCenter}>
                      {availableCenters.map((center) => (
                        <div
                          key={center.id}
                          className="flex items-start space-x-2 p-3 border rounded-lg hover:bg-secondary cursor-pointer"
                        >
                          <RadioGroupItem value={center.id} id={center.id} className="mt-1" />
                          <Label htmlFor={center.id} className="flex-1 cursor-pointer">
                            <div className="font-medium">{center.name}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              {center.address}
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                <Button
                  onClick={handleEnroll}
                  className="w-full bg-gradient-to-r from-primary to-primary-glow text-lg h-12"
                >
                  {selectedMode === 'online' ? 'Enroll Now & Pay' : 'Request Enrollment'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
