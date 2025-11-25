import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Award {
  id: number;
  title: string;
  description: string;
  year: number;
  imageUrl?: string;
}

const Awards = () => {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const res = await fetch("/api/awards");
        const data = await res.json();
        setAwards(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAwards();
  }, []);

  if (loading) return <p className="text-center py-16">Loading Awards...</p>;

  return (
    <section id="awards" className="py-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Awards & Recognitions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award) => (
            <Card key={award.id} className="hover:shadow-lg transition">
              <CardContent className="flex flex-col items-center text-center">
                {award.imageUrl && (
                  <img
                    src={award.imageUrl}
                    alt={award.title}
                    className="rounded-lg object-cover h-48 w-full mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">{award.title}</h3>
                <p className="text-gray-600 mb-2">{award.description}</p>
                <p className="text-sm text-gray-500">{award.year}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
