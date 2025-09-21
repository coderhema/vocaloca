"use client";

import { useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useSpeechRecognition } from "react-speech-kit";

interface VoiceButtonProps {
  onText?: (text: string) => void;
}

const VoiceButton = ({ onText }: VoiceButtonProps) => {
  const { t } = useTranslation("translation");
  const { i18n } = useTranslation();
  const [isListening, setIsListening] = useState(false);

  const getLangCode = (lang: string) => {
    const langMap: { [key: string]: string } = {
      en: "en-US",
      fr: "fr-FR",
      yo: "yo-NG", // Limited support, fallback
      ha: "ha-NG", // Limited support
    };
    return langMap[lang] || "en-US";
  };

  const { listen, stop } = useSpeechRecognition({
    onResult: (result: string) => {
      if (onText && result) {
        onText(result);
        stop();
        setIsListening(false);
      }
    },
    onEnd: () => setIsListening(false),
  });

  const toggleListening = () => {
    if (isListening) {
      stop();
      setIsListening(false);
    } else {
      listen({
        lang: getLangCode(i18n.language),
        interimResults: false,
      });
      setIsListening(true);
    }
  };

  return (
    <motion.button
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[1100] pointer-events-auto bg-primary text-primary-foreground rounded-full p-4 bg-white shadow-lg hover:shadow-xl transition-all duration-200"
      onClick={toggleListening}
      whileTap={{ scale: 0.95 }}
      animate={{ scale: isListening ? [1, 1.1, 1] : 1 }}
      transition={{ duration: 0.3, repeat: isListening ? Infinity : 0, repeatType: "reverse" }}
    >
      {isListening ? <MicOff size={24} /> : <Mic size={24} />}
      <span className="sr-only">{t("voiceButton")}</span>
      {isListening && (
        <motion.div
          className="absolute -inset-2 rounded-full bg-primary/20"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
};

VoiceButton.defaultProps = {
  onText: () => {},
};

export default VoiceButton;