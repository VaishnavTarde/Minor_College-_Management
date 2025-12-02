import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const banners = [
  {
    id: 1,
    title: "Welcome to New Academic Year 2024",
    description: "Join us for an exciting journey of learning and growth",
    gradient: "from-primary to-secondary",
  },
  {
    id: 2,
    title: "Upcoming Tech Fest",
    description: "Register now for exciting competitions and workshops",
    gradient: "from-secondary to-accent",
  },
  {
    id: 3,
    title: "Placement Drive 2024",
    description: "Top companies visiting campus. Prepare yourself!",
    gradient: "from-accent to-primary",
  },
  {
    id: 4,
    title: "Student Achievement Awards",
    description: "Celebrating excellence in academics and extracurriculars",
    gradient: "from-primary/80 to-secondary/80",
  },
];

export const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <section className="relative w-full h-[400px] sm:h-[500px] overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="min-w-full h-full flex items-center justify-center"
          >
            <div className={`w-full h-full bg-gradient-to-r ${banner.gradient} flex items-center justify-center`}>
              <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {banner.title}
                </h2>
                <p className="text-lg sm:text-xl text-white/90">
                  {banner.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
        onClick={goToPrev}
        aria-label="Previous banner"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
        onClick={goToNext}
        aria-label="Next banner"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
