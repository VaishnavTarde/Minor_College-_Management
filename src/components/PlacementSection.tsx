import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Target, BookOpen, Award, Rocket, FileText, Brain, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const placementFeatures = [
  {
    icon: Briefcase,
    title: "Placement Drives",
    description: "Stay updated with upcoming campus recruitment drives from top companies",
  },
  {
    icon: Target,
    title: "Eligibility Criteria",
    description: "Check company-specific eligibility requirements and prepare accordingly",
  },
  {
    icon: TrendingUp,
    title: "Skill Roadmap",
    description: "Personalized skill development paths based on your career goals",
  },
  {
    icon: Award,
    title: "Certifications",
    description: "Industry-recognized certification programs to boost your resume",
  },
  {
    icon: BookOpen,
    title: "Free Resources",
    description: "Access curated learning materials and courses at no cost",
  },
  {
    icon: Rocket,
    title: "Internship Portal",
    description: "Find and apply for internship opportunities across industries",
  },
  {
    icon: FileText,
    title: "Resume Guidelines",
    description: "Professional resume templates and expert review services",
  },
  {
    icon: Brain,
    title: "Practice Tests",
    description: "Aptitude and technical assessments to sharpen your skills",
  },
];

export const PlacementSection = () => {
  return (
    <section id="placements" className="py-16 sm:py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Placement & Internship Zone</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your comprehensive resource center for career preparation and placement success
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {placementFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="hover:shadow-card-hover transition-all">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-3">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-sm">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        <div className="bg-card rounded-lg p-8 shadow-card max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-center">Upcoming Placement Drives</h3>
          <div className="space-y-4">
            {[
              { company: "Tech Corp", role: "Software Engineer", date: "March 18, 2024", package: "12-15 LPA" },
              { company: "Data Solutions", role: "Data Analyst", date: "March 22, 2024", package: "8-10 LPA" },
              { company: "Cloud Systems", role: "DevOps Engineer", date: "March 28, 2024", package: "10-12 LPA" },
            ].map((drive) => (
              <div key={drive.company} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1 mb-4 sm:mb-0">
                  <h4 className="font-semibold text-lg">{drive.company}</h4>
                  <p className="text-sm text-muted-foreground">{drive.role} • {drive.package}</p>
                  <p className="text-xs text-muted-foreground mt-1">{drive.date}</p>
                </div>
                <Button variant="secondary">View Details</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
