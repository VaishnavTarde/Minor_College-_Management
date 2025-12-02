import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ClubsSection = () => {
  const navigate = useNavigate();

  return (
    <section id="clubs" className="py-16 sm:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Student Clubs</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Explore clubs, join activities, and build skills outside the classroom.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/clubs")}
            className="gap-2"
          >
            View All Clubs
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
