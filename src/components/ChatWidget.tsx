
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; time: string }[]>([
    { 
      text: "Hi there! How can I assist you today?", 
      isUser: false, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);
  
  // Automated responses
  const autoResponses = [
    "Thanks for your message! Our team will get back to you shortly.",
    "That's an interesting question. Let me find the best information for you.",
    "I understand your concern. We're here to help!",
    "Could you provide more details so I can assist you better?",
    "I'm checking our resources for the most accurate answer."
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    setMessages(prev => [...prev, { text: message, isUser: true, time }]);
    setMessage('');
    
    // Simulate typing delay then add bot response
    setTimeout(() => {
      const randomResponse = autoResponses[Math.floor(Math.random() * autoResponses.length)];
      setMessages(prev => [...prev, { 
        text: randomResponse, 
        isUser: false, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    }, 1000);
  };
  
  // Scroll to bottom of messages when messages change
  useEffect(() => {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);
  
  return (
    <>
      {/* Chat Button */}
      <button
        className={`fixed bottom-8 right-8 p-4 rounded-full z-40 transition-all duration-300 ${
          isOpen ? 'bg-blog-accent scale-0 opacity-0' : 'bg-blog-neon animate-glow scale-100 opacity-100'
        }`}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6 text-black" />
      </button>
      
      {/* Chat Window */}
      <div 
        className={`fixed bottom-8 right-8 w-80 sm:w-96 rounded-lg shadow-neon-lg bg-blog-darker border border-gray-800 z-50 overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'
        }`}
      >
        {/* Chat Header */}
        <div className="bg-blog-charcoal p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blog-neon rounded-full animate-pulse mr-2"></div>
            <h3 className="text-white font-medium">CyberPulse Assistant</h3>
          </div>
          <button
            className="text-gray-400 hover:text-white transition-colors duration-300"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Messages */}
        <div 
          id="message-container"
          className="p-4 h-80 overflow-y-auto scrollbar-hidden"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3/4 rounded-lg px-4 py-2 ${
                  msg.isUser 
                    ? 'bg-blog-neon text-black ml-auto' 
                    : 'bg-blog-charcoal text-white mr-auto'
                }`}
              >
                <p>{msg.text}</p>
                <span className={`text-xs ${msg.isUser ? 'text-black/70' : 'text-gray-400'} block mt-1`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-gray-800 p-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-blog-charcoal border border-gray-700 rounded-l-md p-2 text-white focus:outline-none focus:border-blog-neon transition-colors duration-300"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blog-neon text-black p-2 rounded-r-md hover:bg-blog-neon/80 transition-colors duration-300"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatWidget;
