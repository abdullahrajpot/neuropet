"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Send, User } from "lucide-react";
import { Container } from "@/components/ui/shared";
import { motion } from "framer-motion";

interface Message {
  _id: string;
  sender: "admin" | "client";
  senderName: string;
  message: string;
  createdAt: string;
  read: boolean;
}

interface AssessmentInfo {
  ownerName: string;
  petName: string;
  email: string;
}

export default function AdminMessagesPage() {
  const router = useRouter();
  const params = useParams();
  const assessmentId = params.id as string;
  const [messages, setMessages] = useState<Message[]>([]);
  const [assessmentInfo, setAssessmentInfo] = useState<AssessmentInfo | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData();
    // Poll for new messages every 10 seconds
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, [assessmentId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchData = async () => {
    try {
      // Fetch assessment info
      const key = sessionStorage.getItem("neuropet-admin-key");
      if (!key) {
        router.push("/admin/login");
        return;
      }

      const assessmentRes = await fetch(`/api/appointments?key=${key}`);
      if (assessmentRes.ok) {
        const assessments = await assessmentRes.json();
        const assessment = assessments.find((a: any) => a._id === assessmentId);
        if (assessment) {
          setAssessmentInfo({
            ownerName: assessment.ownerName || assessment.name,
            petName: assessment.petName,
            email: assessment.email,
          });
        }
      }

      await fetchMessages();
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/messages?assessmentId=${assessmentId}`);
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
    if (!newMessage.trim()) return;

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
      <section className="min-h-screen bg-cream pt-24 pb-16">
        <Container>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-700 border-t-transparent mx-auto"></div>
            <p className="mt-4 text-ink-600">Loading messages...</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-cream pt-24 pb-16">
      <Container>
        <div className="mb-6">
          <Link
            href="/admin/assessments"
            className="inline-flex items-center gap-2 text-sm text-primary-700 hover:text-accent-600"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Assessments
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden" style={{ height: "calc(100vh - 240px)", minHeight: "500px" }}>
          {/* Header */}
          <div className="bg-primary-700 text-white p-6">
            {assessmentInfo && (
              <>
                <h1 className="font-display text-2xl mb-1">
                  Conversation with {assessmentInfo.ownerName}
                </h1>
                <p className="text-primary-200 text-sm">
                  Pet: {assessmentInfo.petName} • {assessmentInfo.email}
                </p>
              </>
            )}
          </div>

          {/* Messages Area */}
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ maxHeight: "calc(100% - 180px)" }}>
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-ink-600">No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <motion.div
                    key={msg._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex gap-3 max-w-[70%] ${msg.sender === "admin" ? "flex-row-reverse" : ""}`}>
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        msg.sender === "admin" 
                          ? "bg-primary-700 text-white" 
                          : "bg-accent-600 text-white"
                      }`}>
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <div className={`rounded-2xl px-5 py-3 ${
                          msg.sender === "admin"
                            ? "bg-primary-700 text-white rounded-br-sm"
                            : "bg-primary-100 text-primary-900 rounded-bl-sm"
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
                  </motion.div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-primary-100 p-4">
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
                  className="flex-1 px-4 py-3 rounded-2xl border-2 border-primary-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all resize-none"
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
      </Container>
    </section>
  );
}
