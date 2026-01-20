import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { voiceScripts } from "@/data/voiceScripts";

const VoiceReader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(0.85);
  const [volume, setVolume] = useState(1);
  const [currentSection, setCurrentSection] = useState(0);
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
  const sections = voiceScripts
    .map(script => document.getElementById(script.id))
    .filter(Boolean) as HTMLElement[];

  sectionsRef.current = sections;

  const loadVoices = () => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      console.log('Voices loaded:', voices.length);
    }
  };

  loadVoices();
  window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

  return () => {
    window.speechSynthesis.cancel();
    window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  };
}, []);

  // Cuộn tới section đang đọc
  const scrollToSection = (index: number) => {
  const el = sectionsRef.current[index];
  if (!el) return;

  const y = el.getBoundingClientRect().top + window.scrollY - 80;

  window.scrollTo({ top: y, behavior: "smooth" });

  sectionsRef.current.forEach((section, i) => {
    section.style.backgroundColor = i === index ? 'rgba(255, 215, 0, 0.1)' : '';
  });
};


  // Đọc một section
  const readSection = (index: number) => {
    if (index < 0 || index >= voiceScripts.length) {
      console.log('No more sections to read');
      stopReading();
      return;
    }

    const script = voiceScripts[index];
    const text = script.content;
    
    console.log(`Reading section ${index}: ${script.title}`);

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Cấu hình voice
    const voices = window.speechSynthesis.getVoices();
    const vietnameseVoice = voices.find(voice => 
      voice.lang.includes('vi') || voice.name.includes('Vietnamese')
    );
    if (vietnameseVoice) {
      utterance.voice = vietnameseVoice;
      console.log('Using voice:', vietnameseVoice.name);
    }
    
    utterance.rate = speed;
    utterance.pitch = 1.0;
    utterance.volume = volume;
    utterance.lang = 'vi-VN';

    // Scroll tới section tương ứng nếu có
    if (sectionsRef.current[index]) {
      scrollToSection(index);
    }

    utterance.onstart = () => {
      console.log('Speech started');
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      console.log('Speech ended');
      // Chuyển sang section tiếp theo
      if (index + 1 < voiceScripts.length) {  
        setCurrentSection(index + 1);
        setTimeout(() => readSection(index + 1), 500);
      } else {
        stopReading();
      }
    };

    utterance.onerror = (event) => {
      console.error('Speech error:', event.error);
      if (event.error !== 'interrupted') {
        stopReading();
      }
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error speaking:', error);
      stopReading();
    }
  };

  const startReading = () => {
    console.log('Start reading from section:', currentSection);
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      // Cancel any existing speech first
      window.speechSynthesis.cancel();
      setTimeout(() => {
        readSection(currentSection);
      }, 200);
    }
  };

  const pauseReading = () => {
    window.speechSynthesis.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentSection(0);
    
    // Remove highlights
    sectionsRef.current.forEach(section => {
      section.style.backgroundColor = '';
    });
  };

  const nextSection = () => {
    if (currentSection + 1 < voiceScripts.length) {
      window.speechSynthesis.cancel();
      const newSection = currentSection + 1;
      setCurrentSection(newSection);
      setTimeout(() => readSection(newSection), 200);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      window.speechSynthesis.cancel();
      const newSection = currentSection - 1;
      setCurrentSection(newSection);
      setTimeout(() => readSection(newSection), 200);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-primary hover:from-gold/90 hover:to-primary/90 shadow-2xl"
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
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Volume2 className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Control Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 left-6 z-50 w-80 bg-card border-2 border-gold/30 rounded-2xl shadow-2xl p-6"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.3 }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-gold" />
                  Đọc nội dung
                </h3>
                <span className="text-xs text-muted-foreground">
                  Phần {currentSection + 1}/{voiceScripts.length}
                </span>
              </div>

              {/* Play Controls */}
              <div className="flex items-center justify-center gap-2">
                <Button
                  onClick={prevSection}
                  disabled={currentSection === 0 || !isPlaying}
                  size="icon"
                  variant="outline"
                  className="border-gold/30"
                >
                  <SkipBack className="w-4 h-4" />
                </Button>

                {isPlaying ? (
                  <Button
                    onClick={pauseReading}
                    size="icon"
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-gold to-primary"
                  >
                    <Pause className="w-5 h-5" />
                  </Button>
                ) : (
                  <Button
                    onClick={startReading}
                    size="icon"
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-gold to-primary"
                  >
                    <Play className="w-5 h-5 ml-0.5" />
                  </Button>
                )}

                <Button
                  onClick={nextSection}
                  disabled={currentSection === voiceScripts.length - 1 || !isPlaying}
                  size="icon"
                  variant="outline"
                  className="border-gold/30"
                >
                  <SkipForward className="w-4 h-4" />
                </Button>
              </div>

              {/* Speed Control */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tốc độ</span>
                  <span className="text-foreground font-medium">{speed}x</span>
                </div>
                <Slider
                  value={[speed]}
                  onValueChange={(value) => {
                    setSpeed(value[0]);
                    if (utteranceRef.current) {
                      window.speechSynthesis.cancel();
                      if (isPlaying) {
                        setTimeout(() => readSection(currentSection), 100);
                      }
                    }
                  }}
                  min={0.5}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Volume Control */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Âm lượng</span>
                  <span className="text-foreground font-medium">{Math.round(volume * 100)}%</span>
                </div>
                <Slider
                  value={[volume]}
                  onValueChange={(value) => {
                    setVolume(value[0]);
                    if (utteranceRef.current) {
                      utteranceRef.current.volume = value[0];
                    }
                  }}
                  min={0}
                  max={1}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {isPlaying && (
                <Button
                  onClick={stopReading}
                  variant="outline"
                  className="w-full border-primary/30 hover:bg-primary/10"
                >
                  Dừng đọc
                </Button>
              )}

              <p className="text-xs text-muted-foreground text-center">
                Nội dung sẽ tự động cuộn theo phần đang đọc
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceReader;
