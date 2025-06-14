
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";

type ChatMessage = { role: "user" | "assistant"; content: string; };

const AI_FUNCTION_URL =
  "https://erwelgqvilhgtqorxwnf.functions.supabase.co/ai-assistant";

const AiChat = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!value.trim()) return;
    setMessages((msgs) => [...msgs, { role: "user", content: value }]);
    setIsLoading(true);

    try {
      const history = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const res = await fetch(AI_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: value, history }),
      });

      if (!res.ok) throw new Error("Error connecting to assistant.");

      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: data.generatedText || "(No response)" },
      ]);
    } catch (error: any) {
      console.error(error);
      toast("The AI service is currently unavailable.");
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: "Sorry, I'm unavailable right now." },
      ]);
    } finally {
      setValue("");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <Card className="max-w-2xl w-full mt-8 p-4 shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">💡 FinnTra AI Assistant</h1>
        <div className="flex flex-col gap-3 min-h-[300px] mb-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-400">Ask me anything about your finances, budgets, or expense planning!</div>
          )}
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`p-2 rounded ${
                m.role === "user" ? "bg-blue-100 text-right" : "bg-gray-50"
              }`}
            >
              <span className="font-medium">{m.role === "user" ? "You" : "FinnTra"}:</span>{" "}
              {m.content}
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!isLoading) sendMessage();
          }}
          className="flex gap-2"
        >
          <input
            className="flex-1 rounded border px-3 py-2"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type your question..."
            disabled={isLoading}
            autoFocus
          />
          <Button disabled={isLoading || !value.trim()} type="submit">
            {isLoading ? "Thinking..." : "Ask"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AiChat;
