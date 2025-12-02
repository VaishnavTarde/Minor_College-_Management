import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your campus assistant. How can I help you today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const quickActions = [
    "How do I access ERP?",
    "Tell me about clubs",
    "Upcoming events",
    "Placement information",
  ];

  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    // Add user message
    const newMessages: Message[] = [...messages, { role: "user", content: message }];
    setMessages(newMessages);
    setInputMessage("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: { message },
      });

      if (error) {
        console.error("Chat error:", error);
        toast({
          title: "Error",
          description: "Failed to get response. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Add assistant message
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    sendMessage(action);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <Card className="mb-4 w-80 sm:w-96 shadow-2xl">
          <div className="p-4 border-b bg-gradient-to-r from-primary to-secondary">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-primary-foreground">Campus Assistant</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 text-primary-foreground hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="p-4 h-96 overflow-y-auto bg-background space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`rounded-lg p-3 ${
                  msg.role === "assistant"
                    ? "bg-muted"
                    : "bg-primary text-primary-foreground ml-8"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            ))}
            
            {isLoading && (
              <div className="bg-muted rounded-lg p-3">
                <p className="text-sm text-muted-foreground">Typing...</p>
              </div>
            )}

            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Quick actions:</p>
                {quickActions.map((action, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto py-2"
                    onClick={() => handleQuickAction(action)}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(inputMessage);
              }}
              className="flex gap-2"
            >
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !inputMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      )}

      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chatbot"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  );
};
