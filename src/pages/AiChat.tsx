
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  Send, 
  Trash2, 
  Copy, 
  Download, 
  Settings, 
  Sparkles,
  Bot,
  User,
  Home,
  MessageSquare,
  Lightbulb
} from "lucide-react";

type ChatMessage = { 
  role: "user" | "assistant"; 
  content: string; 
  timestamp: Date;
  id: string;
};

const AI_FUNCTION_URL = "https://erwelgqvilhgtqorxwnf.functions.supabase.co/ai-assistant";

const suggestions = [
  "How can I save more money this month?",
  "What's my spending pattern analysis?",
  "Create a budget plan for me",
  "Tips for investment planning",
  "How to reduce monthly expenses?",
  "Show me my expense categories"
];

const AiChat = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

  const sendMessage = async (text?: string) => {
    const messageText = text || value.trim();
    if (!messageText) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: messageText,
      timestamp: new Date(),
      id: generateId()
    };

    setMessages((msgs) => [...msgs, userMessage]);
    setIsLoading(true);
    setValue("");

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
        body: JSON.stringify({ prompt: messageText, history }),
      });

      if (!res.ok) throw new Error("Error connecting to assistant.");

      const data = await res.json();
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.generatedText || "Sorry, I couldn't process that request.",
        timestamp: new Date(),
        id: generateId()
      };

      setMessages((msgs) => [...msgs, assistantMessage]);
    } catch (error: any) {
      console.error(error);
      toast.error("The AI service is currently unavailable.");
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "Sorry, I'm unavailable right now. Please try again later.",
        timestamp: new Date(),
        id: generateId()
      };
      setMessages((msgs) => [...msgs, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Message copied to clipboard");
  };

  const exportChat = () => {
    const chatContent = messages.map(msg => 
      `${msg.role === 'user' ? 'You' : 'FinnTra AI'}: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'finntra-chat-export.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-950 dark:to-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => window.location.href = '/'}>
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">FinnTra AI Assistant</h1>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Online
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={exportChat} disabled={messages.length === 0}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={clearChat} disabled={messages.length === 0}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex max-w-4xl mx-auto w-full">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 p-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-full mb-6">
                  <MessageSquare className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome to FinnTra AI
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                  I'm your personal financial assistant. Ask me anything about budgeting, expenses, investments, or financial planning.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                  {suggestions.map((suggestion, index) => (
                    <Card 
                      key={index}
                      className="p-4 cursor-pointer hover:scale-105 transition-all bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                      onClick={() => sendMessage(suggestion)}
                    >
                      <div className="flex items-center space-x-3">
                        <Lightbulb className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{suggestion}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <div className={`p-2 rounded-full ${
                      message.role === "user" 
                        ? "bg-blue-600" 
                        : "bg-gradient-to-r from-purple-600 to-blue-600"
                    }`}>
                      {message.role === "user" ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    
                    <div className={`flex-1 max-w-[80%] ${
                      message.role === "user" ? "text-right" : ""
                    }`}>
                      <div className={`p-4 rounded-2xl shadow-sm ${
                        message.role === "user"
                          ? "bg-blue-600 text-white ml-auto"
                          : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700"
                      }`}>
                        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                      </div>
                      
                      <div className={`flex items-center space-x-2 mt-2 text-xs text-gray-500 dark:text-gray-400 ${
                        message.role === "user" ? "justify-end" : ""
                      }`}>
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => copyMessage(message.content)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!isLoading) sendMessage();
              }}
              className="flex space-x-3"
            >
              <Input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Ask me anything about your finances..."
                disabled={isLoading}
                className="flex-1 h-12 text-base bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                autoFocus
              />
              <Button 
                type="submit" 
                disabled={isLoading || !value.trim()}
                size="lg"
                className="h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              AI responses may contain errors. Always verify important financial advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
