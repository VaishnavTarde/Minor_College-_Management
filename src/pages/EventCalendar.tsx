import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Calendar } from "react-calendar";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_time: string | null;
  location: string | null;
  category: string | null;
}

const EventCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDateEvents, setSelectedDateEvents] = useState<Event[]>([]);
  const { userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  // Set default view to first event month when events load
  useEffect(() => {
    if (events.length > 0) {
      const firstEventDate = new Date(events[0].event_date);
      setSelectedDate(firstEventDate);
    }
  }, [events]);

  useEffect(() => {
    filterEventsForDate(selectedDate);
  }, [selectedDate, events]);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: true });

    if (!error && data) {
      setEvents(data);
    }
  };

  const filterEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    const filtered = events.filter((event) => event.event_date === dateString);
    setSelectedDateEvents(filtered);
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dateString = date.toISOString().split("T")[0];
      const dateEvents = events.filter((event) => event.event_date === dateString);
      if (dateEvents.length > 0) {
        return (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
            {dateEvents.slice(0, 3).map((_, index) => (
              <div key={index} className="w-1 h-1 bg-primary rounded-full"></div>
            ))}
          </div>
        );
      }
    }
    return null;
  };

  const canManageEvents = userRole === "admin" || userRole === "teacher";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Event Calendar</h1>
          {canManageEvents && (
            <Button onClick={() => navigate("/manage-events")}>
              <Plus className="mr-2 h-4 w-4" />
              Manage Events
            </Button>
          )}
        </div>

        <div className="grid lg:grid-cols-[2fr_3fr] gap-8">
          <Card className="h-fit sticky top-24">
            <CardHeader>
              <CardTitle>Select a Date</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                onChange={(value) => setSelectedDate(value as Date)}
                value={selectedDate}
                tileContent={tileContent}
                className="border-none w-full"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-1 w-8 bg-primary rounded-full"></div>
                Events on {selectedDate.toLocaleDateString("en-US", { 
                  month: "long", 
                  day: "numeric", 
                  year: "numeric" 
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-2">
                    No events scheduled for this date
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Select a date with blue dots to view events
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <Card key={event.id} className="border-l-4 border-primary overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                            {event.description && (
                              <p className="text-sm text-muted-foreground mb-3">
                                {event.description}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-3 text-sm">
                              {event.event_time && (
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                  <span className="font-medium">🕐</span>
                                  <span>{event.event_time}</span>
                                </div>
                              )}
                              {event.location && (
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                  <span className="font-medium">📍</span>
                                  <span>{event.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          {event.category && (
                            <Badge variant="secondary" className="shrink-0">{event.category}</Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventCalendar;
