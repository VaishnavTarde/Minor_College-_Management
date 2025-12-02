import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Globe, Camera, Palette, Users, Dumbbell, Languages } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const clubs = [
  {
    name: "Vertex",
    description: "Technical club focused on competitive programming and development. Join us to enhance your coding skills and participate in hackathons.",
    icon: Code,
    tags: ["Tech", "Programming"],
    members: "150+",
    meetingTime: "Wednesdays 4 PM",
  },
  {
    name: "GDG",
    description: "Google Developer Group - Learn latest Google technologies and cloud computing. Build real-world projects with mentorship.",
    icon: Globe,
    tags: ["Tech", "Development"],
    members: "200+",
    meetingTime: "Fridays 3 PM",
  },
  {
    name: "MAC",
    description: "Media & Arts Club - Express your creativity through various art forms including digital art, painting, and multimedia.",
    icon: Palette,
    tags: ["Arts", "Creative"],
    members: "100+",
    meetingTime: "Thursdays 5 PM",
  },
  {
    name: "Shutterbugs",
    description: "Photography club capturing campus moments and teaching photography techniques. Weekly photo walks and exhibitions.",
    icon: Camera,
    tags: ["Photography", "Arts"],
    members: "80+",
    meetingTime: "Saturdays 2 PM",
  },
  {
    name: "GirlScript",
    description: "Empowering women in technology and open source. Participate in coding workshops and community projects.",
    icon: Users,
    tags: ["Tech", "Community"],
    members: "120+",
    meetingTime: "Tuesdays 4 PM",
  },
  {
    name: "CodeArena",
    description: "Competitive programming and hackathon preparation. Practice problems and participate in national competitions.",
    icon: Code,
    tags: ["Tech", "Competitive"],
    members: "180+",
    meetingTime: "Daily practice sessions",
  },
  {
    name: "Foreign Language Club",
    description: "Learn and practice new languages with peers. Currently offering French, Spanish, Japanese, and German classes.",
    icon: Languages,
    tags: ["Languages", "Culture"],
    members: "90+",
    meetingTime: "Mondays & Wednesdays 6 PM",
  },
  {
    name: "Sports Club",
    description: "Stay fit and participate in inter-college tournaments. Multiple sports including cricket, basketball, football, and more.",
    icon: Dumbbell,
    tags: ["Sports", "Fitness"],
    members: "250+",
    meetingTime: "Daily 5-7 PM",
  },
];

const Clubs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">All Student Clubs</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join any of our vibrant student clubs and enhance your college experience
            </p>
            <Button variant="outline" onClick={() => navigate("/")}>
              ← Back to Home
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club) => {
              const Icon = club.icon;
              return (
                <Card key={club.name} className="hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{club.name}</CardTitle>
                    <CardDescription className="min-h-[4rem]">{club.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {club.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-secondary/20 text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                      <p>👥 {club.members} members</p>
                      <p>📅 {club.meetingTime}</p>
                    </div>
                    <Button className="w-full">
                      Join Club
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Clubs;
