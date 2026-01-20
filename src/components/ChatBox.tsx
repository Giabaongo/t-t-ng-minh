import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
    id: number;
    text: string;
    isBot: boolean;
    timestamp: Date;
}

// Knowledge base về nội dung trang web
const knowledgeBase = {
    greetings: [
        "Xin chào! Tôi là trợ lý AI của bài thuyết trình về Tư tưởng Hồ Chí Minh về Chủ nghĩa Xã hội. Bạn có thể hỏi tôi về các chủ đề như: khái niệm CNXH, mục tiêu, đặc trưng, động lực xây dựng, con đường đi lên CNXH, vai trò Đảng và Nhà nước.",
    ],
    topics: {
        "cnxh|chủ nghĩa xã hội|khái niệm": {
            answer: "Theo Hồ Chí Minh, CNXH là chế độ xã hội ưu việt, lấy con người làm trung tâm, hướng tới sự phát triển toàn diện của mỗi cá nhân và cả cộng đồng. Bác từng nói: 'CNXH là làm sao cho dân giàu, nước mạnh'.",
            keywords: ["khái niệm", "định nghĩa", "là gì"]
        },
        "mục tiêu|mục đích|hướng tới": {
            answer: "Mục tiêu của CNXH theo tư tưởng Hồ Chí Minh gồm:\n• Kinh tế phát triển bền vững\n• Đời sống nhân dân ấm no, hạnh phúc\n• Công bằng xã hội - xóa bỏ áp bức bóc lột\n\nVí dụ: Chương trình 'Nông thôn mới' đã cải thiện đáng kể đời sống nông dân.",
            keywords: ["mục tiêu", "mục đích", "hướng tới"]
        },
        "đặc trưng|đặc điểm|riêng biệt": {
            answer: "Đặc trưng của CNXH Việt Nam:\n• Kinh tế: Phát triển lực lượng sản xuất, CNH-HĐH\n• Chính trị: Của dân, do dân, vì dân\n• Văn hóa - Đạo đức: Xây dựng con người mới 'vừa hồng vừa chuyên'\n\nKinh tế thị trường định hướng XHCN là mô hình độc đáo của Việt Nam.",
            keywords: ["đặc trưng", "đặc điểm"]
        },
        "động lực|xây dựng|phát triển": {
            answer: "Động lực xây dựng CNXH:\n• Nhân dân là động lực quyết định (dân là gốc)\n• Kết hợp lợi ích cá nhân và tập thể (win-win)\n• Khoa học - Kỹ thuật là then chốt\n\nVí dụ: Doanh nghiệp tư nhân đóng góp trên 40% GDP cả nước.",
            keywords: ["động lực", "xây dựng"]
        },
        "con đường|quá độ|đi lên": {
            answer: "Con đường đi lên CNXH của Việt Nam:\n• Quá độ từ nước nông nghiệp lạc hậu, bỏ qua giai đoạn TBCN\n• Phù hợp với điều kiện Việt Nam - vận dụng sáng tạo\n• Độc lập dân tộc gắn liền với CNXH\n\nTừ 1986 (Đổi mới), Việt Nam đã thoát khỏi khủng hoảng và phát triển mạnh mẽ.",
            keywords: ["con đường", "quá độ"]
        },
        "đảng|nhà nước|vai trò|lãnh đạo": {
            answer: "Vai trò Đảng và Nhà nước:\n• Đảng lãnh đạo: Kim chỉ nam định hướng phát triển\n• Nhà nước quản lý: Thể chế hóa đường lối thành pháp luật\n• Nhân dân làm chủ: Thực hiện quyền làm chủ trực tiếp và gián tiếp\n\nĐây là cơ chế: Đảng + Nhà nước + Dân = Tam giác quyền lực.",
            keywords: ["đảng", "nhà nước", "vai trò"]
        },
        "hồ chí minh|bác hồ|chủ tịch": {
            answer: "Hồ Chí Minh (1890-1969) là nhà cách mạng, lãnh tụ vĩ đại của dân tộc Việt Nam. Người đã vận dụng sáng tạo chủ nghĩa Mác-Lênin vào điều kiện cụ thể của Việt Nam, xây dựng hệ thống tư tưởng về CNXH mang đậm bản sắc Việt Nam.",
            keywords: ["hồ chí minh", "bác hồ"]
        },
        "mind map|sơ đồ tư duy|bản đồ": {
            answer: "Bạn có thể xem Mind Map tổng quan về Tư tưởng Hồ Chí Minh về CNXH bằng cách click vào 'Mind Map' trên thanh navigation. Mind Map gồm 6 nhánh chính:\n• Khái niệm CNXH\n• Mục tiêu CNXH\n• Đặc trưng CNXH\n• Động lực xây dựng\n• Con đường đi lên CNXH\n• Vai trò Đảng & Nhà nước",
            keywords: ["mind map", "sơ đồ"]
        }
    },
    fallback: "Xin lỗi, tôi chỉ có thể trả lời các câu hỏi liên quan đến nội dung bài thuyết trình về Tư tưởng Hồ Chí Minh về Chủ nghĩa Xã hội. Bạn có thể hỏi về:\n• Khái niệm CNXH\n• Mục tiêu CNXH\n• Đặc trưng CNXH\n• Động lực xây dựng\n• Con đường đi lên CNXH\n• Vai trò Đảng và Nhà nước"
};

// Simple AI response generator
const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase().trim();

    // Check for greetings
    if (lowerInput.match(/^(xin chào|chào|hello|hi|hey|alo)/)) {
        return knowledgeBase.greetings[0];
    }

    // Check for thank you
    if (lowerInput.match(/(cảm ơn|thank|thanks)/)) {
        return "Không có gì! Nếu bạn có thêm câu hỏi về bài thuyết trình, đừng ngại hỏi nhé! 😊";
    }

    // Search through topics
    for (const [pattern, data] of Object.entries(knowledgeBase.topics)) {
        const regex = new RegExp(pattern, "i");
        if (regex.test(lowerInput)) {
            return data.answer;
        }
    }

    // Fallback
    return knowledgeBase.fallback;
};

const ChatBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Xin chào! 👋 Tôi là trợ lý AI của bài thuyết trình. Hãy hỏi tôi về Tư tưởng Hồ Chí Minh về Chủ nghĩa Xã hội!",
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

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text: inputValue,
            isBot: false,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI thinking delay
        setTimeout(() => {
            const botResponse: Message = {
                id: Date.now() + 1,
                text: generateResponse(inputValue),
                isBot: true,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 800 + Math.random() * 700);
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
                                <h3 className="font-semibold">Trợ lý AI</h3>
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
                                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                                        </div>
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
                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim()}
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
