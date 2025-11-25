import React from "react";

const AboutUs: React.FC = () => {
  const features = [
    {
      title: "The BALC",
      description:
        "BALC empowers students to acquire skills and knowledge. Skills give opportunities to build career and contribute to the nation building. The core values of BALC: Integrity, Accountability, Responsibility, Perseverance, and Discipline.",
    },
    {
      title: "Learning Opportunity",
      description:
        "BALC has introduced many IT courses which can compete with any rapid and gradual changes in the IT field. The IT courses of BALC enable students to get adequate skills which can help in their academic and career.",
    },
    {
      title: "Learning Environment",
      description:
        "Nearest Locations, Highly trained staffs, experienced faculties, wi-fi enabled labs, digital library, online classes, weekday, weekend, and summer classes for learners to succeed academically.",
    },
    {
      title: "Research and Development",
      description:
        "The R & D of BALC is constantly working on formulating the new courses based on the developments in IT to meet the requirements of educationalists and industry professionals.",
    },
    {
      title: "230+ Experienced Teachers",
      description:
        "Faculties with good communication, ability to collaborate and adapt are impacting students’ classroom learning for their long-term success.",
    },
    {
      title: "70+ Awesome Courses",
      description:
        "BALC courses are specifically designed for students wanting to make career and join courses at BALC centres that focus on personal and professional development.",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 space-y-12">

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            About BALC
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Empowering learners with high-quality courses and practical knowledge for professional success.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-3 text-primary">Our Mission</h2>
            <p className="text-muted-foreground">
              To provide a wide range of educational programs and practical knowledge that empowers learners to excel in their careers and achieve their goals.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-3 text-primary">Our Vision</h2>
            <p className="text-muted-foreground">
              To become a leading platform for professional growth by offering hands-on learning experiences and industry-aligned courses.
            </p>
          </div>
        </div>

        {/* BALC Features Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Why Choose BALC
          </h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-3 text-blue-700">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

      

        {/* Call to Action */}
        <div className="text-center mt-12">
          <a
            href="/courses"
            className="inline-block px-8 py-4 text-white font-semibold rounded-xl bg-gradient-to-r from-primary to-primary-glow hover:scale-105 transition-transform"
          >
            Explore Courses
          </a>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
