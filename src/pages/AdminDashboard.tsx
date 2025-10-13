import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, DollarSign, TrendingUp, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { mockCourses, type Course } from '@/data/mockCourses';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'development' as Course['category'],
    instructor: '',
    duration: '',
    level: 'beginner' as Course['level'],
    price: '',
    image: '',
    mode: 'both' as Course['mode'],
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    const storedCourses = localStorage.getItem('courses');
    setCourses(storedCourses ? JSON.parse(storedCourses) : mockCourses);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.instructor || !formData.duration || !formData.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    const existingCourses = localStorage.getItem('courses');
    const allCourses = existingCourses ? JSON.parse(existingCourses) : mockCourses;

    if (editingCourse) {
      // Update existing course
      const updatedCourses = allCourses.map((c: Course) => 
        c.id === editingCourse.id ? {
          ...editingCourse,
          title: formData.title,
          description: formData.description,
          category: formData.category,
          instructor: formData.instructor,
          duration: formData.duration,
          level: formData.level,
          price: Number(formData.price),
          image: formData.image || editingCourse.image,
          mode: formData.mode,
        } : c
      );
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      toast.success('Course updated successfully!');
      setEditingCourse(null);
    } else {
      // Add new course
      const newCourse: Course = {
        id: String(Date.now()),
        title: formData.title,
        description: formData.description,
        category: formData.category,
        instructor: formData.instructor,
        duration: formData.duration,
        level: formData.level,
        price: Number(formData.price),
        image: formData.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
        mode: formData.mode,
        rating: 0,
        students: 0,
      };
      allCourses.push(newCourse);
      localStorage.setItem('courses', JSON.stringify(allCourses));
      toast.success('Course added successfully!');
    }

    loadCourses();
    setOpen(false);
    setFormData({
      title: '',
      description: '',
      category: 'development',
      instructor: '',
      duration: '',
      level: 'beginner',
      price: '',
      image: '',
      mode: 'both',
    });
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      category: course.category,
      instructor: course.instructor,
      duration: course.duration,
      level: course.level,
      price: String(course.price),
      image: course.image,
      mode: course.mode,
    });
    setOpen(true);
  };

  const handleDelete = (courseId: string) => {
    const existingCourses = localStorage.getItem('courses');
    const allCourses = existingCourses ? JSON.parse(existingCourses) : mockCourses;
    const updatedCourses = allCourses.filter((c: Course) => c.id !== courseId);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    loadCourses();
    toast.success('Course deleted successfully!');
  };

  const getEnrolledUsers = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.map((user: any, index: number) => ({
      id: index + 1,
      name: user.name || user.email.split('@')[0],
      email: user.email,
      role: user.email === 'admin@BALC.com' ? 'Admin' : 'User',
      enrolledCourses: Math.floor(Math.random() * 5) + 1,
    }));
  };

  const getTransactions = () => {
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '{}');
    const transactions: any[] = [];
    Object.entries(enrollments).forEach(([userId, courseIds]: [string, any]) => {
      courseIds.forEach((courseId: string) => {
        const course = courses.find(c => c.id === courseId);
        if (course) {
          transactions.push({
            id: `TXN${Date.now()}${Math.random()}`,
            courseName: course.title,
            amount: course.price,
            date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            status: 'Completed',
          });
        }
      });
    });
    return transactions;
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-lg text-muted-foreground">Manage your platform</p>
          </div>
          <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) {
              setEditingCourse(null);
              setFormData({
                title: '',
                description: '',
                category: 'development',
                instructor: '',
                duration: '',
                level: 'beginner',
                price: '',
                image: '',
                mode: 'both',
              });
            }
          }}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-primary-glow">
                <Plus className="mr-2 h-4 w-4" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingCourse ? 'Edit Course' : 'Add New Course'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Complete Web Development Bootcamp"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Course description..."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value: Course['category']) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="editing">Editing</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="level">Level *</Label>
                    <Select value={formData.level} onValueChange={(value: Course['level']) => setFormData({ ...formData, level: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="instructor">Instructor *</Label>
                    <Input
                      id="instructor"
                      value={formData.instructor}
                      onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                      placeholder="e.g., John Doe"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration *</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g., 12 weeks"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="e.g., 4999"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mode">Mode *</Label>
                    <Select value={formData.mode} onValueChange={(value: Course['mode']) => setFormData({ ...formData, mode: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL (optional)</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">{editingCourse ? 'Update Course' : 'Add Course'}</Button>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">Cancel</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Grid */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground mt-1">Active courses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,350</div>
              <p className="text-xs text-muted-foreground mt-1">+180 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹2,45,000</div>
              <p className="text-xs text-muted-foreground mt-1">+20% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground mt-1">+5% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Platform Management Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Manage Courses</TabsTrigger>
            <TabsTrigger value="users">Manage Users</TabsTrigger>
            <TabsTrigger value="transactions">View Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center justify-between border-b pb-3">
                      <span className="text-muted-foreground">New enrollment</span>
                      <span className="font-medium">Web Development</span>
                    </div>
                    <div className="flex items-center justify-between border-b pb-3">
                      <span className="text-muted-foreground">Course completed</span>
                      <span className="font-medium">UI/UX Design</span>
                    </div>
                    <div className="flex items-center justify-between border-b pb-3">
                      <span className="text-muted-foreground">New user registered</span>
                      <span className="font-medium">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Payment received</span>
                      <span className="font-medium">₹4,999</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('courses')}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Manage Courses
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('users')}>
                    <Users className="mr-2 h-4 w-4" />
                    Manage Users
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('transactions')}>
                    <DollarSign className="mr-2 h-4 w-4" />
                    View Transactions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>All Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Mode</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell className="capitalize">{course.category}</TableCell>
                        <TableCell>{course.instructor}</TableCell>
                        <TableCell>₹{course.price.toLocaleString()}</TableCell>
                        <TableCell className="capitalize">{course.mode}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost" onClick={() => handleEdit(course)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => handleDelete(course.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Enrolled Courses</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getEnrolledUsers().map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell className="text-right">{user.enrolledCourses}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getTransactions().map((txn) => (
                      <TableRow key={txn.id}>
                        <TableCell className="font-mono text-xs">{txn.id}</TableCell>
                        <TableCell>{txn.courseName}</TableCell>
                        <TableCell>₹{txn.amount.toLocaleString()}</TableCell>
                        <TableCell>{txn.date}</TableCell>
                        <TableCell className="text-right">
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                            {txn.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
