const PressCoverage = () => {
  const newsList = [
    { title: "BALC Launches New AI Program", date: "October 12, 2025", content: "BALC introduces a new Artificial Intelligence course to empower students with future-ready skills." },
    { title: "BALC Expands to Mysore", date: "September 5, 2025", content: "A new BALC franchise opens in Mysore, furthering our mission to spread quality education nationwide." },
  ];

  return (
    <section id="press-coverage" className="py-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Press Coverage</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {newsList.map((news, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-2">{news.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{news.date}</p>
              <p className="text-gray-700">{news.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressCoverage;
