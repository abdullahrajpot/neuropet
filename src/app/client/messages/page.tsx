"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Send, User } from "lucide-react";

interface Message {
  _id: string;
  sender: "admin" | "client";
  senderName: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function ClientMessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [assessmentId, setAssessmentId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchUserAndMessages();
    // Poll for new messages every 10 seconds
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchUserAndMessages = async () => {
    try {
      // Get user info first
      const userRes = await fetch("/api/auth/me");
      if (userRes.ok) {
        const userData = await userRes.json();
        setAssessmentId(userData.user.assessmentId);
        await fetchMessages(userData.user.assessmentId);
      } else {
        router.push("/client/login");
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (aId?: string) => {
    const id = aId || assessmentId;
    if (!id) return;

    try {
      const res = await fetch(`/api/messages?assessmentId=${id}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !assessmentId) return;

    setSending(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentId,
          message: newMessage.trim(),
        }),
      });

      if (res.ok) {
        setNewMessage("");
        await fetchMessages();
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-700 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-ink-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl text-primary-900 mb-2">Messages</h1>
        <p className="text-ink-600">Communicate with your behaviourist</p>
      </div>

      {/* Messages Container */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col" style={{ height: "calc(100vh - 280px)", minHeight: "500px" }}>
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-ink-600">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[70%] ${msg.sender === "client" ? "flex-row-reverse" : ""}`}>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    msg.sender === "admin" 
                      ? "bg-primary-700 text-white" 
                      : "bg-accent-600 text-white"
                  }`}>
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`rounded-2xl px-5 py-3 ${
                      msg.sender === "client"
                        ? "bg-primary-700 text-white rounded-br-sm"
                        : "bg-cream text-primary-900 rounded-bl-sm"
                    }`}>
                      <p className="text-xs font-semibold mb-1 opacity-75">
                        {msg.senderName}
                      </p>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {msg.message}
                      </p>
                    </div>
                    <p className="text-xs text-ink-500 mt-1 px-2">
                      {new Date(msg.createdAt).toLocaleString("en-GB", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-primary-100 p-4 bg-cream/50">
          <form onSubmit={handleSend} className="flex gap-3">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
              placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
              className="flex-1 px-4 py-3 rounded-2xl border-2 border-primary-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all resize-none bg-white"
              rows={2}
              disabled={sending}
            />
            <button
              type="submit"
              disabled={sending || !newMessage.trim()}
              className="px-6 py-3 rounded-2xl bg-primary-700 text-white font-semibold hover:bg-primary-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              {sending ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
