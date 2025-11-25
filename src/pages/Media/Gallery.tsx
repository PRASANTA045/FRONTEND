import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Photo {
  id: number;
  src: string;
  title: string;
}

interface Video {
  id: number;
  url: string;
  title: string;
}

const Gallery = () => {
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        // Replace these URLs with your backend API endpoints
        const photosRes = await fetch("/api/photos");
        const videosRes = await fetch("/api/videos");

        const photosData = await photosRes.json();
        const videosData = await videosRes.json();

        setPhotos(photosData);
        setVideos(videosData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching media:", error);
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Loading Media...</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-8">Media Gallery</h1>

        {/* Tabs */}
        <div className="flex justify-center mb-10 gap-4">
          <Button
            onClick={() => setActiveTab("photos")}
            variant={activeTab === "photos" ? "default" : "outline"}
          >
            Photos
          </Button>
          <Button
            onClick={() => setActiveTab("videos")}
            variant={activeTab === "videos" ? "default" : "outline"}
          >
            Videos
          </Button>
        </div>

        {/* Photos Section */}
        {activeTab === "photos" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition">
                <CardContent className="p-2">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="rounded-lg object-cover h-64 w-full"
                  />
                  <h3 className="text-center text-lg font-medium mt-2">{photo.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Videos Section */}
        {activeTab === "videos" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video) => (
              <div key={video.id}>
                <iframe
                  src={video.url}
                  title={video.title}
                  className="w-full h-80 rounded-lg shadow-lg"
                  allowFullScreen
                ></iframe>
                <h3 className="mt-3 text-lg font-medium">{video.title}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
