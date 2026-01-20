import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
    id: number;
    text: string;
    isBot: boolean;
    timestamp: Date;
}

// System prompt để giới hạn chatbot chỉ trả lời về nội dung bài thuyết trình
const SYSTEM_PROMPT = `Bạn là trợ lý AI chuyên về bài thuyết trình "Tư tưởng Hồ Chí Minh về Chủ nghĩa Xã hội".

CHỈ trả lời các câu hỏi liên quan đến các chủ đề sau:
1. Khái niệm CNXH theo Hồ Chí Minh: CNXH là chế độ xã hội ưu việt, lấy con người làm trung tâm, "dân giàu nước mạnh"
2. Mục tiêu CNXH: Kinh tế phát triển, đời sống ấm no, công bằng xã hội
3. Đặc trưng CNXH Việt Nam: Phát triển lực lượng sản xuất, nhà nước của dân-do dân-vì dân, văn hóa đạo đức "hồng chuyên"
4. Động lực xây dựng CNXH: Nhân dân là động lực quyết định, kết hợp lợi ích cá nhân-tập thể, vai trò khoa học kỹ thuật
5. Con đường đi lên CNXH: Quá độ từ nước nông nghiệp, phù hợp điều kiện Việt Nam, độc lập gắn liền CNXH
6. Vai trò Đảng và Nhà nước: Đảng lãnh đạo, Nhà nước quản lý, Nhân dân làm chủ

Nếu câu hỏi KHÔNG liên quan đến các chủ đề trên, hãy lịch sự từ chối và hướng dẫn người dùng hỏi về nội dung bài thuyết trình.

Trả lời bằng tiếng Việt, ngắn gọn, súc tích (tối đa 200 từ). Sử dụng bullet points khi cần thiết.`;

// Gemini API call function
const callGeminiAPI = async (userMessage: string, conversationHistory: Message[]): Promise<string> => {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    if (!API_KEY) {
        return "⚠️ Chưa cấu hình API key. Vui lòng thêm VITE_GEMINI_API_KEY vào file .env";
    }

    // Build conversation context
    const contents = [
        {
            role: "user",
            parts: [{ text: SYSTEM_PROMPT }]
        },
        {
            role: "model",
            parts: [{ text: "Tôi hiểu. Tôi sẽ chỉ trả lời các câu hỏi liên quan đến bài thuyết trình Tư tưởng Hồ Chí Minh về Chủ nghĩa Xã hội." }]
        },
        // Add conversation history (last 6 messages for context)
        ...conversationHistory.slice(-6).map(msg => ({
            role: msg.isBot ? "model" : "user",
            parts: [{ text: msg.text }]
        })),
        // Add current user message
        {
            role: "user",
            parts: [{ text: userMessage }]
        }
    ];

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents,
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    },
                    safetySettings: [
                        {
                            category: "HARM_CATEGORY_HARASSMENT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            category: "HARM_CATEGORY_HATE_SPEECH",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        }
                    ]
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Gemini API Error:", errorData);
            return "❌ Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.";
        }

        const data = await response.json();

        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        }

        return "❌ Không nhận được phản hồi từ AI. Vui lòng thử lại.";
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "❌ Lỗi kết nối. Vui lòng kiểm tra internet và thử lại.";
    }
};

const ChatBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Xin chào! 👋 Tôi là trợ lý AI được hỗ trợ bởi Gemini. Hãy hỏi tôi về Tư tưởng Hồ Chí Minh về Chủ nghĩa Xã hội!",
            isBot: true,
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim() || isTyping) return;

        const userMessage: Message = {
            id: Date.now(),
            text: inputValue,
            isBot: false,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputValue;
        setInputValue("");
        setIsTyping(true);

        try {
            // Call Gemini API
            const response = await callGeminiAPI(currentInput, messages);

            const botResponse: Message = {
                id: Date.now() + 1,
                text: response,
                isBot: true,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            const errorResponse: Message = {
                id: Date.now() + 1,
                text: "❌ Đã có lỗi xảy ra. Vui lòng thử lại.",
                isBot: true,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Chat Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:shadow-xl flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 z-50 w-[360px] h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                        style={{
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                            border: "1px solid rgba(0,0,0,0.1)"
                        }}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <Bot className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Trợ lý AI Gemini</h3>
                                <p className="text-xs text-white/80">Hỏi về Tư tưởng HCM về CNXH</p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-2 ${message.isBot ? "" : "flex-row-reverse"}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${message.isBot
                                        ? "bg-red-100 text-red-600"
                                        : "bg-blue-100 text-blue-600"
                                        }`}>
                                        {message.isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                    </div>
                                    <div className={`max-w-[75%] p-3 rounded-2xl text-sm whitespace-pre-line ${message.isBot
                                        ? "bg-white text-gray-800 rounded-tl-none shadow-sm"
                                        : "bg-red-600 text-white rounded-tr-none"
                                        }`}>
                                        {message.text}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex gap-2"
                                >
                                    <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                                        <span className="text-sm text-gray-500">Đang suy nghĩ...</span>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t bg-white">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Nhập câu hỏi của bạn..."
                                    disabled={isTyping}
                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 disabled:bg-gray-100"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim() || isTyping}
                                    className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBox;
