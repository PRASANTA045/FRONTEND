import { Toaster } from "@/components/ui/toaster";
import AboutUs from "./pages/AboutUs"; 
import ContactUs from "@/pages/ContactUs";
import HireFromUs from "@/pages/HireFromUs";
import PlacementCell from "@/pages/PlacementCell";
import Franchise from "@/pages/Franchise";
import Blog from "@/pages/Blog";
import BlogsDetail from "@/pages/BlogsDetail";


import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

import Navbar from "@/components/Navbar";

// Existing pages
import Home from "./pages/Home";
import Courses from "./pages/Courses"; // <-- Import Courses page
import CourseDetail from "./pages/CourseDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsofService from "./pages/TermsofService";
import Event from "./pages/Media/Event";
import Awards from "./pages/Media/Awards";
import Gallery from "./pages/Media/Gallery";
import PressCoverage from "./pages/Media/PressCoverage";
import Publication from "./pages/Media/Publication";


const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} /> {/* <-- Add this route */}
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/hire-from-us" element={<HireFromUs />} />
            <Route path="/placement-cell" element={<PlacementCell />} />
            <Route path="/franchise" element={<Franchise />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogsDetail />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsofService />} />
            <Route path="/media/event" element={<Event />} />
            <Route path="/media/awards" element={<Awards />} />
            <Route path="/media/gallery" element={<Gallery />} />
            <Route path="/media/press-coverage" element={<PressCoverage />} />
            <Route path="/media/publication" element={<Publication />} />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);


export default App;