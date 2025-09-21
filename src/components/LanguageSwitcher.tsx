"use client";

import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", name: "English" },
    { code: "ar", name: "Armhaic" },
    { code: "yo", name: "Èdè Yorùbá" },
    { code: "ha", name: "Hausa" },
  ];

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <motion.div
      className="fixed top-4 right-4 z-[1100] bg-white pointer-events-auto"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Select value={i18n.language} onValueChange={changeLanguage}>
        <SelectTrigger className="w-[180px] bg-card border-gray-100">
          <Globe className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
};

export default LanguageSwitcher;