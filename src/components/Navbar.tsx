import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  GraduationCap,
  LogOut,
  User,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [mediaOpen, setMediaOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mediaRef = useRef<HTMLDivElement>(null);

  // Close Media dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mediaRef.current &&
        !mediaRef.current.contains(event.target as Node)
      ) {
        setMediaOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
    { name: "Hire from Us", path: "/hire-from-us" },
    { name: "Placement Cell", path: "/placement-cell" },
    { name: "Franchise", path: "/franchise" },
    { name: "Blog", path: "/blog" },
  ];

  const mediaLinks = [
    { name: "Gallery", path: "/media/gallery" },
    { name: "Awards", path: "/media/awards" },
    { name: "Press Coverage", path: "/media/press-coverage" },
    { name: "Event", path: "/media/event" },
    { name: "Publication", path: "/media/publication" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-glow">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              BALC
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/courses"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              All Courses
            </Link>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {/* Media Dropdown */}
            <div ref={mediaRef} className="relative">
              <button
                onClick={() => setMediaOpen(!mediaOpen)}
                className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors"
              >
                Media <ChevronDown className="h-4 w-4" />
              </button>

              {mediaOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                  {mediaLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setMediaOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* User Auth */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    {user.fullName}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to={user.role === "ADMIN" ? "/admin" : "/dashboard"}>
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-primary-glow"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 border-t border-border">
          <div className="flex flex-col px-4 py-2 gap-2">

            <Link
              to="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium hover:text-primary"
            >
              All Courses
            </Link>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium hover:text-primary"
              >
                {link.name}
              </Link>
            ))}

            <div className="flex flex-col pl-2 border-l">
              {mediaLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm py-1 hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {user ? (
              <>
                <Link
                  to={user.role === "ADMIN" ? "/admin" : "/dashboard"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm hover:text-primary"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-sm text-destructive py-1"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm hover:text-primary"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm hover:text-primary"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
