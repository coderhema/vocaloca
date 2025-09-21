"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const { t } = useTranslation("translation");
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <motion.form
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[1100] pointer-events-auto bg-white  rounded-xl shadow-lg px-4 py-2 flex items-center !w-[339px] !h-[43px]"
      onSubmit={handleSubmit}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}>

      <Search className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
      <input
        type="text"
        placeholder={t("searchPlaceholder")}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 bg-transparent border-0 p-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0" />

    </motion.form>);

};

export default SearchBar;