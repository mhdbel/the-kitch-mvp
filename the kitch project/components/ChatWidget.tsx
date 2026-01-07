'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  language: string;
}

const quickReplies = [
  { text: "Quels sont vos plats végétariens?", lang: 'fr' },
  { text: "Livrez-vous à Hay Riad?", lang: 'fr' },
  { text: "Formule déjeuner pour 4 personnes", lang: 'fr' },
  { text: "Do you have English menu?", lang: 'en' },
  { text: "هل لديكم أطباق حلال؟", lang: 'ar' },
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Bonjour! Je suis KitchBot, l'assistant IA de The Kitch Rabat. Je parle français, anglais et arabe. Comment puis-je vous aider?",
      isUser: false,
      timestamp: new Date(),
      language: 'fr'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectLanguage = (text: string): string => {
    // Simple language detection
    if (/[\u0600-\u06FF]/.test(text)) return 'ar';
    if (/^[a-zA-Z\s]+$/.test(text)) return 'en';
    return 'fr';
  };

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    if (!text) setInput('');
    
    const userLanguage = detectLanguage(messageText);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
      language: userLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: messageText,
          conversationHistory: messages.slice(-10).map(msg => ({
            role: msg.isUser ? 'user' : 'assistant',
            content: msg.text
          })),
          sessionId,
          language: userLanguage
        })
      });

      const data = await response.json();
      
      if (data.reply) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.reply,
          isUser: false,
          timestamp: new Date(),
          language: userLanguage
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Désolé, je rencontre une difficulté technique. Vous pouvez nous contacter directement au +212 661 11 22 33.",
        isUser: false,
        timestamp: new Date(),
        language: 'fr'
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    if (window.confirm('Effacer toute la conversation?')) {
      setMessages([
        {
          id: '1',
          text: "Bonjour! Je suis KitchBot, l'assistant IA de The Kitch Rabat. Je parle français, anglais et arabe. Comment puis-je vous aider?",
          isUser: false,
          timestamp: new Date(),
          language: 'fr'
        }
      ]);
      toast.success('Conversation réinitialisée');
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative">
          <div className="w-14 h-14 gradient-primary rounded-full shadow-xl flex items-center justify-center">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span 
