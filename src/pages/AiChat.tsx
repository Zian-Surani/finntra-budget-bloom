
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Bot, 
  User, 
  Send, 
  Home, 
  Sparkles, 
  MessageSquare, 
  TrendingUp, 
  Calculator, 
  PieChart,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Settings
} from 'lucide-react';
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from '@/components/ui/sonner';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AiChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm FinnTra AI, your personal financial assistant. I can help you with expense tracking, budgeting advice, tax calculations, investment insights, and financial planning. What would you like to know about your finances today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [conversationStarters] = useState([
    "How can I reduce my monthly expenses?",
    "What's the best way to track my spending?",
    "Help me calculate my tax savings",
    "Show me investment opportunities"
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Create conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      const response = await fetch('https://erwelgqvilhgtqorxwnf.supabase.co/functions/v1/ai-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyd2VsZ3F2aWxoZ3Rxb3J4d25mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMDg2OTQsImV4cCI6MjA2NDc4NDY5NH0.uFxR65Pt7iha84iKY37p-axHL9rR8UKAMsyKVnOnZO8`
        },
        body: JSON.stringify({
          prompt: userMessage.content,
          history: conversationHistory
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: data.generatedText || "I apologize, but I'm having trouble processing your request right now. Please try again.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling AI assistant:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I'm sorry, I'm experiencing some technical difficulties. Please check your connection and try again. If the problem persists, our AI service might be temporarily unavailable.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      toast.error('Failed to get AI response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleStarterClick = (starter: string) => {
    setInput(starter);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Message copied to clipboard');
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        type: 'assistant',
        content: "Hello! I'm FinnTra AI, your personal financial assistant. I can help you with expense tracking, budgeting advice, tax calculations, investment insights, and financial planning. What would you like to know about your finances today?",
        timestamp: new Date()
      }
    ]);
    toast.success('Chat cleared');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b dark:bg-gray-900/80 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FinnTra AI Assistant</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your personal financial advisor</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="hidden sm:flex">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
            <Button variant="outline" size="sm" onClick={clearChat}>
              <RefreshCw className="h-4 w-4" />
            </Button>
            <ThemeToggle />
            <Button onClick={() => window.location.href = '/dashboard'} variant="outline">
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageSquare className="h-5 w-5" />
                  Quick Starters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {conversationStarters.map((starter, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start h-auto p-3 text-wrap"
                    onClick={() => handleStarterClick(starter)}
                  >
                    {starter}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5" />
                  AI Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calculator className="h-4 w-4 text-blue-600" />
                  <span>Financial calculations</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <PieChart className="h-4 w-4 text-green-600" />
                  <span>Budget analysis</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  <span>Investment advice</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Settings className="h-4 w-4 text-orange-600" />
                  <span>Financial planning</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="flex-shrink-0 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">AI Assistant Online</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {messages.length - 1} messages
                  </Badge>
                </div>
              </CardHeader>
              
              <Separator />
              
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.type === 'assistant' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      )}
                      
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : ''}`}>
                        <div className={`rounded-lg p-4 ${
                          message.type === 'user' 
                            ? 'bg-blue-600 text-white ml-4' 
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                        }`}>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        </div>
                        
                        <div className={`flex items-center gap-2 mt-2 text-xs text-gray-500 ${
                          message.type === 'user' ? 'justify-end mr-4' : 'justify-start'
                        }`}>
                          <span>{message.timestamp.toLocaleTimeString()}</span>
                          {message.type === 'assistant' && (
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => copyMessage(message.content)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                              >
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                              >
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {message.type === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              <Separator />
              
              <div className="p-4 flex-shrink-0">
                <div className="flex gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your finances..."
                    className="resize-none min-h-[60px]"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
