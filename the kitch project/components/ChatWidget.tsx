'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Clock, MapPin, Users } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  language?: string;
}

const quickReplies = [
  {
    icon: <MapPin className="w-4 h-4" />,
    text: "Livrez-vous à Hay Riad?",
    description: "Zone de livraison Rabat"
  },
  {
    icon: <Clock className="w-4 h-4" />,
    text: "Quels sont vos horaires?",
    description: "Ouverture & fermeture"
  },
  {
    icon: <Users className="w-4 h-4" />,
    text: "Formule déjeuner pour 4 personnes",
    description: "Menus professionnels"
  },
  {
    icon: <Bot className="w-4 h-4" />,
    text: "Plats végétariens recommandés?",
    description: "Suggestions IA"
  }
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Bonjour! 👋 Je suis KitchBot, votre assistant IA pour The Kitch Rabat. Je peux vous aider avec le menu, les livraisons, les réservations et plus encore. Comment puis-je vous aider aujourd'hui?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('fr');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    if (!text) {
      setInput('');
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
      language,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: messageText,
          language,
          conversationId: Date.now().toString(),
        })
      });

      const data = await response.json();
      
      if (data.reply) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.reply,
          isUser: false,
          timestamp: new Date(),
          language,
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('No response from AI');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Désolé, je rencontre des difficultés techniques. Veuillez réessayer ou nous appeler au +212 661 234 567.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      toast.error('Erreur de connexion avec l\'assistant IA');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (text: string) => {
    sendMessage(text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full shadow-xl flex items-center justify-center animate-pulse-glow">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">AI</span>
          </div>
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">KitchBot Assistant</h3>
                    <div className="flex items-center space-x-2 text-sm opacity-90">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-300 rounded-full mr-1"></div>
                        <span>En ligne</span>
                      </div>
                      <span>•</span>
                      <div className="flex space-x-1">
                        {['🇫🇷', '🇬🇧', '🇲🇦'].map((flag) => (
                          <button
                            key={flag}
                            onClick={() => setLanguage(flag === '🇫🇷' ? 'fr' : flag === '🇬🇧' ? 'en' : 'ar')}
                            className={`text-sm ${language === (flag === '🇫🇷' ? 'fr' : 
