import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Câu hỏi và câu trả lời mẫu về nội dung (fallback khi API lỗi)
const qaDatabase: Record<string, string> = {
  "chủ nghĩa xã hội là gì": "Chủ nghĩa xã hội là một chế độ xã hội tiến bộ, trong đó nhân dân làm chủ, kinh tế phát triển gắn với công bằng xã hội, văn hóa phong phú, con người được phát triển toàn diện.",
  "mục tiêu của cnxh": "Mục tiêu tổng quát là giải phóng con người khỏi nghèo đói, bất công, lạc hậu và nâng cao đời sống vật chất và tinh thần. Mục tiêu cụ thể bao gồm phát triển kinh tế, công bằng xã hội, giáo dục văn hóa và y tế sức khỏe.",
  "đặc trưng cnxh": "5 đặc trưng cơ bản: Nhân dân làm chủ xã hội, kinh tế gắn với công bằng, văn hóa phong phú, đoàn kết xã hội, và con người là trung tâm.",
  "động lực xây dựng cnxh": "Các động lực chính bao gồm: Nhân dân là động lực quan trọng nhất, đoàn kết toàn dân tộc, giáo dục và khoa học, và vai trò lãnh đạo đúng đắn của Đảng và Nhà nước.",
  "con đường đi lên cnxh": "Con đường phù hợp với điều kiện Việt Nam, không rập khuôn, tiến hành từng bước một cách kiên trì, và kết hợp đồng bộ các yếu tố kinh tế - văn hóa - đạo đức - xã hội."
};

// Context về nội dung chương
const CONTEXT = `
Bạn là trợ lý AI chuyên về Chủ nghĩa Xã hội theo tư tưởng Hồ Chí Minh. Hãy trả lời các câu hỏi dựa trên thông tin sau:

QUAN NIỆM VỀ CHỦ NGHĨA XÃ HỘI:
- Chủ nghĩa xã hội là chế độ xã hội tiến bộ
- Nhân dân làm chủ, quyền lực thuộc về nhân dân
- Con người làm chủ xã hội, làm chủ tự nhiên và làm chủ bản thân

MỤC TIÊU:
- Mục tiêu tổng quát: Giải phóng con người khỏi nghèo đói, bất công, lạc hậu. Nâng cao đời sống vật chất và tinh thần
- Mục tiêu cụ thể: Phát triển kinh tế, công bằng xã hội, giáo dục văn hóa, y tế sức khỏe

ĐẶC TRƯNG:
1. Nhân dân làm chủ xã hội - quyền lực thuộc về nhân dân
2. Kinh tế gắn với công bằng - phát triển bền vững, chia sẻ thành quả
3. Văn hóa phong phú - đời sống tinh thần đa dạng, lành mạnh
4. Đoàn kết xã hội - gắn bó, tương trợ lẫn nhau
5. Con người là trung tâm - phát triển con người toàn diện

ĐỘNG LỰC XÂY DỰNG:
- Nhân dân: Động lực quan trọng nhất, chủ thể của mọi sự phát triển
- Đoàn kết toàn dân tộc: Sức mạnh tổng hợp từ khối đại đoàn kết dân tộc
- Giáo dục và khoa học: Nền tảng tri thức để phát triển đất nước
- Lãnh đạo đúng đắn: Vai trò của Đảng và Nhà nước

CON ĐƯỜNG ĐI LÊN:
- Phù hợp điều kiện Việt Nam - xuất phát từ thực tiễn đất nước
- Không rập khuôn - sáng tạo, không áp dụng máy móc mô hình bên ngoài
- Tiến hành từng bước - quá trình lâu dài, kiên trì, bền bỉ
- Kết hợp đồng bộ - Kinh tế, Văn hóa, Đạo đức, Xã hội

Hãy trả lời ngắn gọn, rõ ràng và chính xác dựa trên thông tin trên.
`;

// Hàm tìm câu trả lời từ database
const findAnswer = (question: string): string => {
  const normalizedQuestion = question.toLowerCase().trim();
  
  // Tìm câu trả lời phù hợp
  for (const [key, value] of Object.entries(qaDatabase)) {
    if (normalizedQuestion.includes(key) || key.includes(normalizedQuestion)) {
      return value;
    }
  }

  // Nếu không tìm thấy, trả về câu trả lời mặc định
  return "Xin lỗi, tôi chưa có thông tin về câu hỏi này. Bạn có thể hỏi về: mục tiêu CNXH, đặc trưng CNXH, động lực xây dựng CNXH, hoặc con đường đi lên CNXH.";
};

// Hàm gọi API
const callAI = async (userMessage: string): Promise<string> => {
  try {
    // Sử dụng Google Gemini API
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyB8h5ECwADP_PWOAWpKAbLcsttTbd3vgyA";
    console.log("Sử dụng Gemini API");
    
    if (!apiKey) {
      console.warn("API key không được cấu hình, sử dụng fallback");
      return findAnswer(userMessage);
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${CONTEXT}\n\nCâu hỏi: ${userMessage}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error:', response.status, errorText);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;

  } catch (error) {
    console.error('Lỗi khi gọi AI API:', error);
    // Fallback về câu trả lời có sẵn
    return findAnswer(userMessage);
  }
};

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Xin chào! Tôi có thể giúp bạn tìm hiểu về Chủ nghĩa Xã hội theo tư tưởng Hồ Chí Minh. Hãy đặt câu hỏi nhé!",
      sender: "bot",
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

    // Thêm tin nhắn của user
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot typing và trả lời
    setTimeout(async () => {
      try {
        const answer = await callAI(inputValue);
        const botMessage: Message = {
          id: messages.length + 2,
          text: answer,
          sender: "bot",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        const errorMessage: Message = {
          id: messages.length + 2,
          text: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.",
          sender: "bot",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-gold hover:from-primary/90 hover:to-gold/90 shadow-2xl"
          size="icon"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Chatbox Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-card border-2 border-gold/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-gold p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white">Trợ lý CNXH</h3>
                <p className="text-xs text-white/80">Luôn sẵn sàng hỗ trợ</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === "user" 
                      ? "bg-primary" 
                      : "bg-gold/20"
                  }`}>
                    {message.sender === "user" ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-gold" />
                    )}
                  </div>
                  <div className={`max-w-[70%] ${message.sender === "user" ? "items-end" : ""}`}>
                    <div className={`p-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-primary text-white rounded-tr-none"
                        : "bg-muted text-foreground rounded-tl-none"
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 px-2">
                      {message.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-gold" />
                  </div>
                  <div className="bg-muted p-3 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <motion.span
                        className="w-2 h-2 bg-gold rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-gold rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-gold rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-card border-t border-gold/20">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập câu hỏi của bạn..."
                  className="flex-1 border-gold/30 focus:border-gold"
                />
                <Button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-primary to-gold hover:from-primary/90 hover:to-gold/90"
                  size="icon"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbox;
