import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BannerSlider } from "@/components/BannerSlider";
import { ClubsSection } from "@/components/ClubsSection";
import { EventsSection } from "@/components/EventsSection";
import { PlacementSection } from "@/components/PlacementSection";
import { LoginSection } from "@/components/LoginSection";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <LoginSection />
        <BannerSlider />
        <ClubsSection />
        <EventsSection />
        <PlacementSection />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default Index;
