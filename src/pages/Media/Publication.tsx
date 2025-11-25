import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Publication {
  id: number;
  title: string;
  description: string;
  pdfUrl: string;
  imageUrl?: string;
}

const Publication = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const res = await fetch("/api/publications");
        setPublications(await res.json());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPublications();
  }, []);

  if (loading) return <p className="text-center py-16">Loading Publications...</p>;

  return (
    <section id="publications" className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Publications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publications.map((pub) => (
            <Card key={pub.id} className="hover:shadow-lg transition">
              <CardContent className="flex flex-col items-center text-center">
                {pub.imageUrl && (
                  <img src={pub.imageUrl} alt={pub.title} className="rounded-lg object-cover h-48 w-full mb-4" />
                )}
                <h3 className="text-xl font-semibold mb-2">{pub.title}</h3>
                <p className="text-gray-600 mb-4">{pub.description}</p>
                <a href={pub.pdfUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button className="w-full bg-primary hover:bg-primary-glow text-white">View PDF</Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publication;
