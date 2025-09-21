"use client";

import { useState, useEffect } from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useTranslation } from "react-i18next";
import Groq from "groq-sdk";

interface SuggestionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  location: string;
}

const SuggestionsDrawer = ({ isOpen, onClose, location }: SuggestionsDrawerProps) => {
  const { t } = useTranslation("translation");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && location) {
      generateSuggestions();
    }
  }, [isOpen, location]);

  // Support either public or private env var name; only NEXT_PUBLIC_* is exposed to browser
  const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY || process.env.GROQ_API_KEY;

  const generateSuggestions = async () => {
    if (!location) return;
    setLoading(true);
    try {
      // Gracefully handle missing API key in browser
      if (!apiKey) {
        setSuggestions([t("noSuggestions")]);
        return;
      }

      const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });

      const prompt = `Generate 3 intelligent, concise suggestions for places or tips related to "${location}" on a map, considering a multilingual assistant in English, French, Yoruba, or Hausa. Format as a numbered list.`;
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "gemma2-9b-it",
        temperature: 0.7,
        max_tokens: 200,
      });

      const text = completion.choices[0]?.message?.content || "";
      const sugList = text
        .split("\n")
        .filter((line) => line.trim() && !line.startsWith("```") )
        .map((line) => line.replace(/^\d+[\).\-:]?\s*/, "").trim());
      setSuggestions(sugList);
    } catch (error) {
      console.error("Groq API error:", error);
      setSuggestions([t("noSuggestions")]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DrawerContent className="max-h-[80vh] p-4">
        <h2 className="text-lg font-semibold mb-4 text-foreground">{t("suggestionsTitle")}</h2>
        {loading ? (
          <p className="text-muted-foreground">Generating suggestions...</p>
        ) : (
          <ul className="space-y-2">
            {suggestions.length > 0 ? (
              suggestions.map((sug, idx) => (
                <li key={idx} className="text-sm text-foreground">{`${idx + 1}. ${sug}`}</li>
              ))
            ) : (
              <li className="text-sm text-muted-foreground">{t("noSuggestions")}</li>
            )}
          </ul>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default SuggestionsDrawer;