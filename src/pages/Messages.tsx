import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, ArrowLeft, Search, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Contact {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  time: string;
  isMine: boolean;
}

const mockContacts: Contact[] = [
  { id: "1", name: "Naledi Mokoena", role: "Mentor · CS", lastMessage: "Sure, let's schedule a session!", time: "2m ago", unread: 2, online: true },
  { id: "2", name: "Thabo Ndlovu", role: "Mentor · Engineering", lastMessage: "Check out this resource 📎", time: "1h ago", unread: 0, online: true },
  { id: "3", name: "Priya Naidoo", role: "Mentor · Life Sciences", lastMessage: "Good luck with your exam!", time: "3h ago", unread: 1, online: false },
  { id: "4", name: "Arjun Pillay", role: "Tutor · Commerce", lastMessage: "I can help with that topic", time: "1d ago", unread: 0, online: false },
  { id: "5", name: "Lerato Mthembu", role: "Society · Tech Hub", lastMessage: "Meeting on Friday at 4pm", time: "2d ago", unread: 0, online: false },
];

const mockMessages: Record<string, Message[]> = {
  "1": [
    { id: "m1", senderId: "1", text: "Hi! I saw you're interested in web dev. I'd love to help! 🚀", time: "10:30 AM", isMine: false },
    { id: "m2", senderId: "me", text: "That would be amazing! I'm struggling with React hooks.", time: "10:32 AM", isMine: true },
    { id: "m3", senderId: "1", text: "No worries, hooks can be tricky at first. Want to do a session this week?", time: "10:33 AM", isMine: false },
    { id: "m4", senderId: "me", text: "Yes please! When works for you?", time: "10:35 AM", isMine: true },
    { id: "m5", senderId: "1", text: "Sure, let's schedule a session!", time: "10:36 AM", isMine: false },
  ],
  "2": [
    { id: "m6", senderId: "2", text: "Hey, I found this great engineering resource", time: "9:00 AM", isMine: false },
    { id: "m7", senderId: "2", text: "Check out this resource 📎", time: "9:01 AM", isMine: false },
  ],
  "3": [
    { id: "m8", senderId: "me", text: "Thanks for the biology notes!", time: "Yesterday", isMine: true },
    { id: "m9", senderId: "3", text: "Good luck with your exam!", time: "Yesterday", isMine: false },
  ],
};

const Messages = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [conversations, setConversations] = useState(mockMessages);

  const selected = mockContacts.find((c) => c.id === selectedId);
  const messages = selectedId ? conversations[selectedId] || [] : [];

  const filteredContacts = mockContacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = () => {
    if (!newMessage.trim() || !selectedId) return;
    const msg: Message = {
      id: crypto.randomUUID(),
      senderId: "me",
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMine: true,
    };
    setConversations((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), msg],
    }));
    setNewMessage("");
  };

  const initials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] md:h-screen">
      {/* Contact list */}
      <div
        className={cn(
          "w-full md:w-80 border-r border-border flex flex-col bg-card/30 shrink-0",
          selectedId && "hidden md:flex"
        )}
      >
        <div className="p-4 border-b border-border">
          <h1 className="font-display text-xl font-bold mb-3">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations…"
              className="pl-9"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedId(contact.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors",
                  selectedId === contact.id
                    ? "bg-primary/10"
                    : "hover:bg-secondary"
                )}
              >
                <div className="relative">
                  <Avatar className="w-11 h-11">
                    <AvatarFallback className="bg-secondary text-foreground font-display font-semibold text-sm">
                      {initials(contact.name)}
                    </AvatarFallback>
                  </Avatar>
                  {contact.online && (
                    <Circle className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 fill-emerald-500 text-background stroke-[3]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm text-foreground truncate">{contact.name}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0">{contact.time}</span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{contact.lastMessage}</div>
                </div>
                {contact.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shrink-0">
                    {contact.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat area */}
      <div
        className={cn(
          "flex-1 flex flex-col min-w-0",
          !selectedId && "hidden md:flex"
        )}
      >
        {selected ? (
          <>
            {/* Chat header */}
            <div className="h-16 border-b border-border flex items-center gap-3 px-4 shrink-0 bg-card/30">
              <button onClick={() => setSelectedId(null)} className="md:hidden text-muted-foreground">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Avatar className="w-9 h-9">
                <AvatarFallback className="bg-secondary text-foreground font-display font-semibold text-xs">
                  {initials(selected.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-sm text-foreground">{selected.name}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  {selected.online && <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" />}
                  {selected.online ? "Online" : "Offline"} · {selected.role}
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3 max-w-2xl mx-auto">
                {messages.map((msg) => (
                  <div key={msg.id} className={cn("flex", msg.isMine ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-[75%] px-4 py-2.5 rounded-2xl text-sm",
                        msg.isMine
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-secondary text-foreground rounded-bl-md"
                      )}
                    >
                      <p>{msg.text}</p>
                      <p className={cn(
                        "text-[10px] mt-1",
                        msg.isMine ? "text-primary-foreground/60" : "text-muted-foreground"
                      )}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t border-border p-3 shrink-0">
              <div className="flex gap-2 max-w-2xl mx-auto">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  placeholder="Type a message…"
                  className="flex-1"
                />
                <Button onClick={handleSend} size="icon" disabled={!newMessage.trim()} className="shrink-0 shadow-gold">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                <Send className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="font-display font-semibold">Select a conversation</p>
              <p className="text-sm mt-1">Choose a contact to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
