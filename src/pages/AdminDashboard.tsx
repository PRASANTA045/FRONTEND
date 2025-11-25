import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  getAllPurchases,
  getAllUsersWithPurchases,
} from "@/api/purchaseApi";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  BookOpen,
  Users,
  DollarSign,
  TrendingUp,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";
import { toast } from "sonner";

import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "@/api/courseApi";
import { getAllUsers } from "@/api/userApi";
import { uploadMedia, getAllMedia } from "@/api/mediaApi";
import { getAllCenters, createCenter } from "@/api/centerApi"; // <-- Import createCenter

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);

  const [courses, setCourses] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [media, setMedia] = useState<any[]>([]);
  const [centers, setCenters] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);

  const [activeTab, setActiveTab] = useState("overview");
  const [purchases, setPurchases] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    // ---- for course ----
    title: "",
    description: "",
    category: "development",
    instructor: "",
    duration: "",
    level: "beginner",
    price: "",
    imageUrl: "",
    mode: "both",
    centerId: "",
    // ---- for center ----
    centerName: "",
    address: "",
    city: "",
    state: "",
    contactNumber: "",
  });

  const resetCourseForm = () => {
    setFormData({
      ...formData,
      title: "",
      description: "",
      category: "development",
      instructor: "",
      duration: "",
      level: "beginner",
      price: "",
      imageUrl: "",
      mode: "both",
      centerId: "",
    });
  };

  const resetCenterForm = () => {
    setFormData({
      ...formData,
      centerName: "",
      address: "",
      city: "",
      state: "",
      contactNumber: "",
    });
  };

  // ----------------------------------------------------
  // LOAD DATA
  // ----------------------------------------------------
  useEffect(() => {
    loadCourses();
    loadUsers();
    loadMedia();
    loadCenters();
    loadPurchases();
    loadEnrollments();
  }, []);

  const loadCenters = async () => {
    try {
      const res = await getAllCenters();
      setCenters(res.data);
    } catch {
      toast.error("Failed to load centers");
    }
  };

  const loadCourses = async () => {
    try {
      const res = await getAllCourses();
      setCourses(res.data);
    } catch {
      toast.error("Failed to load courses");
    }
  };

  const loadUsers = async () => {
    try {
      const res = await getAllUsers();
      const filtered = res.data.content
        ? res.data.content.filter((u: any) => u.role !== "ADMIN")
        : res.data.filter((u: any) => u.role !== "ADMIN");
      setUsers(filtered);
    } catch {
      toast.error("Failed to load users");
    }
  };

  const loadPurchases = async () => {
    try {
      const res = await getAllPurchases();
      const data = res.data.content || res.data; // handle both cases
      setPurchases(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load purchased courses");
    }
  };

  const loadMedia = async () => {
    try {
      const res = await getAllMedia();
      setMedia(res.data);
    } catch {
      toast.error("Failed to load media");
    }
  };

  const loadEnrollments = async () => {
    try {
      const res = await getAllUsersWithPurchases();
      setEnrollments(res.data); // array of UserPurchaseSummaryDto
    } catch {
      toast.error("Failed to load enrollments");
    }
  };

  // ----------------------------------------------------
  // COURSE FORM SUBMIT
  // ----------------------------------------------------
  const handleCourseSubmit = async (e: any) => {
    e.preventDefault();

    if (
      (formData.mode === "offline" || formData.mode === "both") &&
      !formData.centerId
    ) {
      toast.error("Please select a center.");
      return;
    }

    const payload = {
      courseTitle: formData.title,
      description: formData.description,
      category: formData.category,
      level: formData.level,
      instructor: formData.instructor,
      duration: formData.duration,
      price: Number(formData.price),
      mode: formData.mode,
      imageUrl: formData.imageUrl,
      centerIds: formData.centerId ? [Number(formData.centerId)] : [],
    };

    try {
      if (editingCourse) {
        await updateCourse(editingCourse.id, payload);
        toast.success("Course updated successfully!");
      } else {
        await createCourse(payload);
        toast.success("Course added successfully!");
      }

      setOpen(false);
      setEditingCourse(null);
      resetCourseForm();
      loadCourses();
    } catch {
      toast.error("Failed to save course");
    }
  };

  const handleEdit = (course: any) => {
    setEditingCourse(course);
    setFormData({
      ...formData,
      title: course.courseTitle,
      description: course.description,
      category: course.category,
      instructor: course.instructor,
      duration: course.duration,
      level: course.level,
      price: String(course.price),
      imageUrl: course.imageUrl,
      mode: course.mode,
      centerId: course.centerId || "",
    });
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCourse(id);
      toast.success("Course deleted successfully");
      loadCourses();
    } catch {
      toast.error("Failed to delete course");
    }
  };

  // ----------------------------------------------------
  // CENTER FORM SUBMIT
  // ----------------------------------------------------
  const handleCenterSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createCenter({
        centerName: formData.centerName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        contactNumber: formData.contactNumber,
      });
      toast.success("Center added successfully!");
      resetCenterForm();
      loadCenters();
    } catch {
      toast.error("Failed to add center");
    }
  };
  // ----------------------------------------------------
  // RENDER PREP: CALCULATE ENROLLED USERS
  // ----------------------------------------------------

  // Calculate unique users who have made a purchase (enrolled students)
  const enrolledUsers = Array.from(new Set(purchases.map((p) => p.user?.id)))
    .map((userId) => users.find((u) => u.id === userId))
    .filter((user) => user !== undefined);

  // ----------------------------------------------------
  // RENDER
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Manage your platform
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-primary-glow">
                <Plus className="mr-2 h-4 w-4" /> Add Course
              </Button>
            </DialogTrigger>

            {/* ADD / EDIT COURSE MODAL */}
            <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingCourse ? "Edit Course" : "Add New Course"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleCourseSubmit} className="space-y-4">
                {/* TITLE */}
                <div>
                  <Label>Course Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>

                {/* DESCRIPTION */}
                <div>
                  <Label>Description *</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>

                {/* CATEGORY + LEVEL */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(v) =>
                        setFormData({ ...formData, category: v })
                      }
                    >
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

                  <div>
                    <Label>Level *</Label>
                    <Select
                      value={formData.level}
                      onValueChange={(v) =>
                        setFormData({ ...formData, level: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* INSTRUCTOR + DURATION */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Instructor *</Label>
                    <Input
                      value={formData.instructor}
                      onChange={(e) =>
                        setFormData({ ...formData, instructor: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label>Duration *</Label>
                    <Input
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                {/* PRICE + MODE */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Price *</Label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label>Mode *</Label>
                    <Select
                      value={formData.mode}
                      onValueChange={(v) =>
                        setFormData({
                          ...formData,
                          mode: v,
                          centerId: "",
                        })
                      }
                    >
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

                {/* CENTER (Conditional) */}
                {(formData.mode === "offline" || formData.mode === "both") && (
                  <div>
                    <Label>Select Center *</Label>
                    <Select
                      value={formData.centerId}
                      onValueChange={(v) =>
                        setFormData({ ...formData, centerId: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Center" />
                      </SelectTrigger>
                      <SelectContent>
                        {centers.map((c) => (
                          <SelectItem key={c.id} value={String(c.id)}>
                            {c.centerName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* IMAGE URL */}
                <div>
                  <Label>Image URL</Label>
                  <Input
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                  />
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-3 mt-4">
                  <Button className="flex-1" type="submit">
                    {editingCourse ? "Update Course" : "Add Course"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* ----------------------------------------------------
            DASHBOARD TABS
        ---------------------------------------------------- */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* MODIFIED: Changed from grid layout to flex-nowrap to guarantee one line */}
          <TabsList className="flex w-full overflow-x-auto justify-start border-b border-input">
            <TabsTrigger value="overview" className="flex-shrink-0">
              Overview
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex-shrink-0">
              Courses
            </TabsTrigger>
            <TabsTrigger value="users" className="flex-shrink-0">
              All Users
            </TabsTrigger>
            <TabsTrigger value="enrollments" className="flex-shrink-0">
              Enrollments
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex-shrink-0">
              Transactions
            </TabsTrigger>
            <TabsTrigger value="media" className="flex-shrink-0">
              Media
            </TabsTrigger>
            <TabsTrigger value="centers" className="flex-shrink-0">
              Centers
            </TabsTrigger>
          </TabsList>

          {/* -------- OVERVIEW -------- */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{courses.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Total Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{users.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₹0</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">85%</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* -------- COURSES TAB -------- */}
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
                    {courses.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell>{c.courseTitle}</TableCell>
                        <TableCell>{c.category}</TableCell>
                        <TableCell>{c.instructor}</TableCell>
                        <TableCell>₹{c.price}</TableCell>
                        <TableCell>{c.mode}</TableCell>

                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(c)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(c.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* -------- USERS TAB (All Users) -------- */}
          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Registered Users (Excluding Admin)</CardTitle>
              </CardHeader>

              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {users.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell>{u.fullName}</TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>{u.role}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* -------- ENROLLMENTS TAB (Unique Enrolled Students) -------- */}
          <TabsContent value="enrollments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Enrolled Students ({enrollments.length})</CardTitle>
              </CardHeader>

              <CardContent>
                {enrollments.length === 0 ? (
                  <p className="text-muted-foreground">No enrollments found.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Total Courses</TableHead>
                        <TableHead>Courses Purchased</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {enrollments.map((u) => (
                        <TableRow key={u.userId}>
                          <TableCell>{u.fullName}</TableCell>
                          <TableCell>{u.email}</TableCell>
                          <TableCell>{u.purchases.length}</TableCell>

                          <TableCell>
                            {u.purchases.map((c: any) => (
                              <div key={c.purchaseId}>
                                • {c.courseTitle} ({c.mode})
                              </div>
                            ))}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* -------- TRANSACTIONS TAB (Existing Purchase Data) -------- */}
          <TabsContent value="transactions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                {purchases.length === 0 ? (
                  <p className="text-muted-foreground">No transactions yet.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Course Title</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Purchase Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {purchases.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell>{p.user?.fullName}</TableCell>
                          <TableCell>{p.user?.email}</TableCell>
                          <TableCell>{p.course?.courseTitle}</TableCell>
                          <TableCell>₹{p.course?.price}</TableCell>
                          <TableCell>
                            {new Date(p.purchaseDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{p.paymentStatus || "Paid"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* -------- MEDIA TAB -------- */}
          <TabsContent value="media" className="mt-6">
            <Card className="p-4">
              <CardHeader>
                <CardTitle>Media Library</CardTitle>
              </CardHeader>

              <CardContent>
                {media.length === 0 ? (
                  <p className="text-muted-foreground">
                    No media uploaded yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {media.map((m) => (
                      <img
                        key={m.id}
                        src={`http://localhost:9090${m.fileUrl}`}
                        className="rounded shadow"
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* CENTERS TAB */}
          <TabsContent value="centers" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Centers</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCenterSubmit} className="space-y-4">
                  <div>
                    <Label>Center Name *</Label>
                    <Input
                      required
                      value={formData.centerName}
                      onChange={(e) =>
                        setFormData({ ...formData, centerName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Address *</Label>
                    <Input
                      required
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>City *</Label>
                      <Input
                        required
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>State *</Label>
                      <Input
                        required
                        value={formData.state}
                        onChange={(e) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Contact Number *</Label>
                    <Input
                      required
                      value={formData.contactNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contactNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Add Center
                  </Button>
                </form>

                <div className="mt-6">
                  {centers.length === 0 ? (
                    <p className="text-muted-foreground">
                      No centers added yet.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {centers.map((c) => (
                        <li key={c.id} className="p-3 border rounded">
                          <strong>{c.centerName}</strong> - {c.address},{" "}
                          {c.city}, {c.state} ({c.contactNumber})
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
