import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircle, GraduationCap, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const loginOptions = [
  {
    icon: UserCircle,
    title: "Student Login",
    description: "Access your courses, assignments, and grades",
    gradient: "from-primary to-primary/80",
  },
  {
    icon: GraduationCap,
    title: "Teacher Login",
    description: "Manage classes, assignments, and student records",
    gradient: "from-secondary to-secondary/80",
  },
  {
    icon: BookOpen,
    title: "Admin Login",
    description: "System administration and management portal",
    gradient: "from-accent to-accent/80",
  },
];

export const LoginSection = () => {
  const navigate = useNavigate();

  return (
    <section id="login" className="py-16 sm:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Access Your Portal</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your role to access the appropriate portal and features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {loginOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card key={option.title} className="hover:shadow-card-hover transition-all">
                <CardHeader>
                  <div className={`h-16 w-16 rounded-lg bg-gradient-to-br ${option.gradient} flex items-center justify-center mb-4 mx-auto`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-center">{option.title}</CardTitle>
                  <CardDescription className="text-center">{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => navigate('/auth')}
                  >
                    Sign In
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
