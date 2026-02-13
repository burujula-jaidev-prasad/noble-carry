import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Gamepad2, ArrowRight, User, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'emily';
    timestamp: Date;
    type?: 'text' | 'options' | 'products' | 'offer';
    options?: string[];
};

const EmilyChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [step, setStep] = useState<'getName' | 'main' | 'recommending_purpose' | 'recommending_budget' | 'recommending_material' | 'sustainability' | 'faq' | 'feedback'>('getName');
    const [recommendationParams, setRecommendationParams] = useState({ purpose: '', budget: '', material: '' });
    const [hasShownOffer, setHasShownOffer] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const initialMessage: Message = {
                id: '1',
                text: "Welcome to Noble Carry.\nBefore we begin, may I know your name?",
                sender: 'emily',
                timestamp: new Date(),
            };
            setMessages([initialMessage]);
        }
        scrollToBottom();
    }, [isOpen, messages]);

    const addMessage = (text: string, sender: 'user' | 'emily', type: Message['type'] = 'text', options?: string[]) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            text,
            sender,
            timestamp: new Date(),
            type,
            options,
        };
        setMessages(prev => [...prev, newMessage]);
    };

    const handleSend = (textOverride?: string) => {
        const textToSend = textOverride || inputValue;
        if (!textToSend.trim()) return;

        addMessage(textToSend, 'user');
        setInputValue('');

        // Emily's Logic Flow
        setTimeout(() => {
            processEmilyResponse(textToSend);
        }, 1000);
    };

    const processEmilyResponse = (userInput: string) => {
        if (step === 'getName') {
            const name = userInput.trim();
            setUserName(name);
            setStep('main');
            addMessage(`Lovely to meet you, ${name}.\nI’m Emily, your sustainability assistant. How may I help you today?`, 'emily', 'options', ['Product Recommendations', 'Sustainability Education', 'FAQ', 'Chat with Human']);
        } else if (step === 'main') {
            handleMainMenu(userInput);
        } else if (step === 'recommending_purpose') {
            setRecommendationParams(prev => ({ ...prev, purpose: userInput }));
            setStep('recommending_budget');
            addMessage("What is your budget range for this investment?", 'emily', 'options', ['Under ₹14,000', '₹14,000 - ₹16,000', 'Above ₹16,000']);
        } else if (step === 'recommending_budget') {
            setRecommendationParams(prev => ({ ...prev, budget: userInput }));
            setStep('recommending_material');
            addMessage("Do you have a material preference?", 'emily', 'options', ['Reclaimed Canvas', 'Upcycled Leather', 'Organic Cotton', 'Any Sustainable Material']);
        } else if (step === 'recommending_material') {
            const finalParams = { ...recommendationParams, material: userInput };
            showRecommendations(finalParams);
            setStep('main');
        } else if (step === 'feedback') {
            addMessage("Thank you for your valuable feedback, " + (userName || "friend") + ". It helps us refine our sustainable mission.", 'emily');
            setStep('main');
        } else {
            // Default fallback
            addMessage("I understand. Would you like to explore our collections or learn more about our materials?", 'emily', 'options', ['Collections', 'Materials', 'Main Menu']);
            setStep('main');
        }
    };

    const handleMainMenu = (input: string) => {
        const lowerInput = input.toLowerCase();

        if (lowerInput.includes('recommend') || lowerInput.includes('product')) {
            setStep('recommending_purpose');
            addMessage("I would be delighted to assist. What is the primary purpose of the handbag you are seeking?", 'emily', 'options', ['Office', 'Travel', 'Casual', 'Tote']);
        } else if (lowerInput.includes('sustain') || lowerInput.includes('material') || lowerInput.includes('education')) {
            addMessage("Noble Carry utilizes reclaimed textiles, organic fibers, and upcycled leathers. Our carbon footprint is minimized by reclaiming waste locally and supporting traditional artisans. Each piece is designed for longevity, reducing the need for repeated consumption.", 'emily', 'options', ['Main Menu', 'View Products']);
        } else if (lowerInput.includes('faq') || lowerInput.includes('shipping') || lowerInput.includes('return') || lowerInput.includes('warranty')) {
            handleFAQ(lowerInput);
        } else if (lowerInput.includes('human') || lowerInput.includes('support')) {
            addMessage("For complex queries, please contact our excellence team at bjaidevprasad@gmail.com. We typically respond within 12 hours.", 'emily');
        } else if (lowerInput.includes('buy') || lowerInput.includes('purchase') || lowerInput.includes('shop')) {
            if (!hasShownOffer) {
                setHasShownOffer(true);
                addMessage(`${userName}, would you like a 10% first-time purchase discount?`, 'emily', 'offer');
            } else {
                addMessage("Our collections are available under the 'Handbags' section. Would you like me to recommend something specific?", 'emily', 'options', ['Recommendations', 'View All']);
            }
        } else if (lowerInput.includes('finish') || lowerInput.includes('end') || lowerInput.includes('thanks') || lowerInput.includes('thank you')) {
            setStep('feedback');
            addMessage(`${userName}, how was your shopping experience today?`, 'emily');
        } else {
            addMessage("May I assist you with product recommendations, sustainability details, or our service policies?", 'emily', 'options', ['Recommendations', 'Sustainability', 'FAQ']);
        }
    };

    const handleFAQ = (input: string) => {
        if (input.includes('shipping')) {
            addMessage("We deliver globally within 4–7 business days. Each package is shipped using plastic-free, biodegradable materials.", 'emily');
        } else if (input.includes('return')) {
            addMessage("We offer a 7-day return policy on all unused products in their original condition. Sustainability starts with mindful purchases.", 'emily');
        } else if (input.includes('warranty')) {
            addMessage("Our products carry a 6-month warranty on stitching and hardware. We believe in the quality of our handcrafted manufacturing.", 'emily');
        } else {
            addMessage("I can provide information on shipping, returns, and our product warranty. Which would you prefer?", 'emily', 'options', ['Shipping', 'Returns', 'Warranty', 'Main Menu']);
        }
    };

    const showRecommendations = (params: any) => {
        const recommended = PRODUCTS.filter(p => {
            // Purpose matching
            const matchPurpose =
                (params.purpose === 'Office' && (p.subCategory.includes('Corporate') || p.id === 'hb-office')) ||
                (params.purpose === 'Travel' && (p.subCategory.includes('Everyday') || p.id === 'hb-daily')) ||
                (params.purpose === 'Casual' && (p.subCategory.includes('Essentials') || p.id === 'hb-minimal')) ||
                (params.purpose === 'Tote' && (p.subCategory.includes('Shopping') || p.id === 'hb-tote'));

            // Budget matching
            let matchBudget = true;
            if (params.budget === 'Under ₹14,000') matchBudget = p.price < 14000;
            if (params.budget === 'Above ₹16,000') matchBudget = p.price > 16000;

            // Material matching
            let matchMaterial = true;
            if (params.material !== 'Any Sustainable Material') {
                matchMaterial = p.impact.materials.some(m => m.toLowerCase().includes(params.material.toLowerCase()));
            }

            return matchPurpose && matchBudget && matchMaterial;
        }).slice(0, 3);

        if (recommended.length === 0) {
            addMessage(`While I couldn't find an exact match for your specific criteria, ${userName}, these premium sustainable bags might still interest you:`, 'emily');
        } else {
            addMessage(`Based on your preference for ${params.purpose.toLowerCase()} use, I have selected these premium pieces for you, ${userName}:`, 'emily');
        }

        // Simulate product display
        setTimeout(() => {
            addMessage("RECO_PRODUCTS", 'emily', 'products');
        }, 500);
    };

    const renderMessageContent = (msg: Message) => {
        if (msg.text === "RECO_PRODUCTS") {
            const recommended = PRODUCTS.filter(p => {
                if (recommendationParams.purpose === 'Office') return p.subCategory.includes('Corporate') || p.id === 'hb-office';
                if (recommendationParams.purpose === 'Travel') return p.subCategory.includes('Everyday') || p.id === 'hb-daily';
                if (recommendationParams.purpose === 'Casual') return p.subCategory.includes('Essentials') || p.id === 'hb-minimal';
                if (recommendationParams.purpose === 'Tote') return p.subCategory.includes('Shopping') || p.id === 'hb-tote';
                return true;
            }).slice(0, 2);

            return (
                <div className="flex flex-col gap-3 mt-2">
                    {recommended.map(product => (
                        <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            onClick={() => setIsOpen(false)}
                            className="bg-white/50 backdrop-blur-sm border border-[#2d3a2d]/10 rounded-xl p-3 flex gap-4 hover:bg-white transition-colors group"
                        >
                            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                            <div className="flex flex-col justify-center">
                                <span className="text-xs font-mono uppercase tracking-widest text-[#2d3a2d]/60">{product.name}</span>
                                <span className="text-sm font-bold text-[#2d3a2d]">₹{product.price.toLocaleString()}</span>
                                <span className="text-[10px] text-[#556b2f] flex items-center gap-1 mt-1">View Details <ArrowRight size={10} /></span>
                            </div>
                        </Link>
                    ))}
                    <button
                        onClick={() => handleMainMenu('Main Menu')}
                        className="text-xs font-mono uppercase tracking-widest text-[#556b2f] mt-2 underline"
                    >
                        Back to menu
                    </button>
                </div>
            );
        }

        if (msg.type === 'offer') {
            return (
                <div className="flex flex-col gap-3">
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                addMessage("YES-10", 'user');
                                setTimeout(() => addMessage("Exquisite choice. Use code NOBLE10 at checkout to apply your first-time purchase benefit.", 'emily'), 800);
                            }}
                            className="px-4 py-2 bg-[#556b2f] text-white rounded-full text-xs font-bold uppercase tracking-widest"
                        >
                            Apply Discount
                        </button>
                        <button
                            onClick={() => {
                                addMessage("Not now", 'user');
                                setTimeout(() => addMessage("Understood. I shall be here if you change your mind.", 'emily'), 800);
                            }}
                            className="px-4 py-2 border border-[#2d3a2d]/20 rounded-full text-xs font-mono"
                        >
                            Maybe Later
                        </button>
                    </div>
                </div>
            );
        }

        return <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>;
    };

    return (
        <div className="fixed bottom-6 right-6 z-[200]">
            {/* Chat Toggle Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="w-16 h-16 bg-[#2d3a2d] text-[#f2efe8] rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-[#556b2f] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <MessageSquare size={28} className="relative z-10" />
                    {messages.length === 0 && (
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute inset-0 border-2 border-[#556b2f] rounded-full"
                        />
                    )}
                </motion.button>
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 100, originX: 1, originY: 1 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 100 }}
                        className="w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-6rem)] bg-[#f2efe8] rounded-[32px] shadow-2xl border border-[#2d3a2d]/10 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-[#2d3a2d] p-6 text-[#f2efe8] flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#556b2f] rounded-full flex items-center justify-center relative">
                                    <span className="text-xl font-serif">E</span>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#2d3a2d] rounded-full" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-none">Emily</h3>
                                    <span className="text-[10px] uppercase tracking-widest opacity-60">Sustainability Assistant</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className={`p-4 rounded-2xl text-sm ${msg.sender === 'user'
                                            ? 'bg-[#2d3a2d] text-[#f2efe8] rounded-tr-none shadow-lg'
                                            : 'bg-white text-[#2d3a2d] rounded-tl-none border border-[#2d3a2d]/5 shadow-sm'
                                            }`}>
                                            {renderMessageContent(msg)}
                                        </div>
                                        {msg.sender === 'emily' && msg.options && (
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {msg.options.map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => handleSend(opt)}
                                                        className="px-4 py-2 bg-[#556b2f]/10 text-[#556b2f] border border-[#556b2f]/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#556b2f] hover:text-white transition-all transform hover:scale-105"
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                        <span className="text-[8px] uppercase tracking-widest font-mono text-[#2d3a2d]/30 mt-1 px-1">
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-6 pt-0">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder={step === 'getName' ? "Enter your name..." : "Type your message..."}
                                    className="w-full bg-white border border-[#2d3a2d]/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[#556b2f] transition-colors pr-12 shadow-sm"
                                />
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!inputValue.trim()}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[#556b2f] hover:text-[#2d3a2d] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                            <div className="flex items-center justify-center gap-2 mt-4 opacity-30 select-none">
                                <Sparkles size={10} />
                                <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Noble Carry Intelligence</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EmilyChatBot;
