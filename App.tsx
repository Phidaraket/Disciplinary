import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { Message, Role } from './types';
import Header from './components/Header';
import MessageInput from './components/MessageInput';
import ChatBubble from './components/ChatBubble';
import LoadingSpinner from './components/LoadingSpinner';
import InfoForm from './components/InfoForm';
// FIX: Import the 'Icon' component to fix a compilation error.
import Icon from './components/Icon';

const App: React.FC = () => {
  const [hasSubmittedInfo, setHasSubmittedInfo] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasSubmittedInfo) return;

    const initializeChat = () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const chatSession = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: 'You are a helpful and friendly AI assistant. Keep your responses concise and easy to understand.',
          },
        });
        setChat(chatSession);
        setMessages([
          {
            role: Role.MODEL,
            text: "Hello! I'm your friendly AI assistant. How can I help you today?",
          },
        ]);
      } catch (e) {
        console.error("Initialization failed:", e);
        setError("Failed to initialize the AI. Please check your API key and refresh the page.");
      }
    };
    initializeChat();
  }, [hasSubmittedInfo]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || !chat) return;

    const userMessage: Message = { role: Role.USER, text: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput('');
    setIsLoading(true);
    setError(null);

    try {
      const stream = await chat.sendMessageStream({ message: userInput });
      
      let modelResponse = '';
      setMessages((prev) => [...prev, { role: Role.MODEL, text: '' }]);

      for await (const chunk of stream) {
        modelResponse += chunk.text;
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = modelResponse;
          return newMessages;
        });
      }

    } catch (e: unknown) {
      console.error("Message sending failed:", e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(`Sorry, something went wrong. ${errorMessage}`);
      setMessages((prev) => prev.slice(0, -1)); // remove empty model message
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasSubmittedInfo) {
    return <InfoForm onSubmit={() => setHasSubmittedInfo(true)} />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-grow overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg, index) => (
            <ChatBubble key={index} message={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-2">
                 <Icon icon="bot" className="w-5 h-5 text-gray-300" />
               </div>
               <div className="bg-gray-700 rounded-2xl px-4 py-3">
                 <LoadingSpinner />
               </div>
            </div>
          )}
          {error && (
            <div className="bg-red-500/20 text-red-300 p-3 rounded-lg text-center">
              {error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>
      <MessageInput
        userInput={userInput}
        setUserInput={setUserInput}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default App;