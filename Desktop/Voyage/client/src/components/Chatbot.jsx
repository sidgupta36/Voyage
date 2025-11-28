import React, { useState, useRef, useEffect } from 'react';
import { IoChatbubbleEllipsesOutline, IoClose } from "react-icons/io5";
import { FiSend } from "react-icons/fi";
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! I'm your travel assistant. How can I help you today?", sender: "bot" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: "user" };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/api/chat', { message: input });
            const botMessage = { text: response.data.response, sender: "bot" };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage = { text: "Sorry, something went wrong. Please try again.", sender: "bot" };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl w-80 sm:w-96 h-[500px] mb-4 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
                    >
                        {/* Header */}
                        <div className="bg-primary p-4 flex justify-between items-center text-primary-foreground">
                            <div className="flex items-center gap-2">
                                <IoChatbubbleEllipsesOutline size={24} />
                                <h3 className="font-semibold text-lg">Voyage AI</h3>
                            </div>
                            <button onClick={toggleChat} className="hover:bg-white/20 p-1 rounded-full transition">
                                <IoClose size={24} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-br-none'
                                            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-gray-700 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1 items-center">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask me anything..."
                                className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={isLoading || !input.trim()}
                                className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FiSend size={20} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleChat}
                className="bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
            >
                {isOpen ? <IoClose size={28} /> : <IoChatbubbleEllipsesOutline size={28} />}
            </motion.button>
        </div>
    );
};

export default Chatbot;
