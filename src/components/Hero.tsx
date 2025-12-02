import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, GraduationCap } from "lucide-react";

export const Hero = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome to College Portal
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Quick links to courses, clubs, events and personal dashboard. Need help? Chat with our virtual assistant.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
          <Button
            size="lg"
            className="w-full sm:w-auto min-w-[200px] h-16 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            onClick={() => window.open("https://mitaoe.mastersofterp.in/iitmsv4eGq0RuNHb0G5WbhLmTKLmTO7YBcJ4RHuXxCNPvuIw=?enc=EGbCGWnlHNJ/WdgJnKH8DA==", "_blank")}
          >
            <BookOpen className="mr-2 h-6 w-6" />
            Access ERP
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          
          <Button
            size="lg"
            variant="secondary"
            className="w-full sm:w-auto min-w-[200px] h-16 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            onClick={() => window.open("http://moodle.mitaoe.ac.in/login/", "_blank")}
          >
            <GraduationCap className="mr-2 h-6 w-6" />
            Access Moodle
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
