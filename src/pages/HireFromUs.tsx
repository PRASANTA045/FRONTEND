import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const HireFromUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Hire Form Submitted:", formData);
    alert("Thank you for showing interest! We’ll contact you soon.");
    setFormData({ name: "", company: "", phone: "", email: "" });
  };

  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Hire From Us</h1>
          <p className="text-gray-600 text-lg">
            Partner with us to recruit skilled and job-ready candidates trained in the latest technologies.
          </p>
        </div>

        {/* === Two Column Section === */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* ---- Left Column: Info Cards ---- */}
          <div className="grid gap-6">
            <Card>
              <CardContent className="p-6 text-left">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Industry-Ready Talent</h3>
                <p className="text-gray-600">
                  Our students are trained through hands-on projects and equipped with modern technologies and frameworks.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-left">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Dedicated Placement Support</h3>
                <p className="text-gray-600">
                  We connect top-performing candidates with companies that value skill and practical knowledge.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-left">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Collaborate with Us</h3>
                <p className="text-gray-600">
                  Partner with us for internships, recruitment drives, and long-term talent acquisition programs.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* ---- Right Column: Hire Form ---- */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Hire Our Students</h2>

            <form onSubmit={handleSubmit} className="grid gap-6 text-left">
              {/* Name */}
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  placeholder="Enter company name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter phone number"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter email address"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit */}
              <div className="text-center mt-4">
                <Button type="submit" className="px-8 py-3 text-lg">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireFromUs;
