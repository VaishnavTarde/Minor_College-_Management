import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_time: string | null;
  location: string | null;
  category: string | null;
}

const EventCard = ({ event }: { event: Event }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { 
      month: "long", 
      day: "numeric", 
      year: "numeric" 
    });
  };

  return (
    <Card className="hover:shadow-card-hover transition-all">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
            <CardDescription>{event.description}</CardDescription>
          </div>
          {event.category && (
            <span className="px-3 py-1 text-xs rounded-full bg-accent/20 text-accent-foreground font-medium">
              {event.category}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {formatDate(event.event_date)}
            {event.event_time && ` • ${event.event_time}`}
          </span>
        </div>
        {event.location && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const EventsSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .gte("event_date", new Date().toISOString().split("T")[0])
      .order("event_date", { ascending: true })
      .limit(6);

    if (!error && data) {
      setEvents(data);
    }
  };

  const techEvents = events.filter(e => 
    e.category?.toLowerCase().includes("tech") || 
    e.category?.toLowerCase().includes("academic")
  );
  
  const nonTechEvents = events.filter(e => 
    !e.category?.toLowerCase().includes("tech") && 
    !e.category?.toLowerCase().includes("academic")
  );

  return (
    <section id="events" className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover upcoming tech and non-tech events. View full calendar for more details.
          </p>
          <Button onClick={() => navigate("/calendar")} variant="outline" className="mt-4">
            View Full Calendar
          </Button>
        </div>

        <Tabs defaultValue="all" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="tech">Tech</TabsTrigger>
            <TabsTrigger value="non-tech">Non-Tech</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.length > 0 ? (
                events.slice(0, 6).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <p className="col-span-full text-center text-muted-foreground py-8">
                  No upcoming events at the moment
                </p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="tech" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techEvents.length > 0 ? (
                techEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <p className="col-span-full text-center text-muted-foreground py-8">
                  No tech events scheduled
                </p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="non-tech" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nonTechEvents.length > 0 ? (
                nonTechEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <p className="col-span-full text-center text-muted-foreground py-8">
                  No non-tech events scheduled
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
