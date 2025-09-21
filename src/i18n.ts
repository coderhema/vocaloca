import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Accurate translations based on web searches and refinements
const resources = {
  en: {
    translation: {
      "voiceButton": "Press to speak",
      "searchPlaceholder": "Search for places on a map",
      "suggestionsTitle": "AI Suggestions",
      "noSuggestions": "No suggestions available",
    }
  },
  fr: {
    translation: {
      "voiceButton": "Appuyez pour parler",
      "searchPlaceholder": "Rechercher des lieux sur la carte",
      "suggestionsTitle": "Suggestions IA",
      "noSuggestions": "Aucune suggestion disponible",
    }
  },
  yo: {
    translation: {
      "voiceButton": "Tẹ́ láti sọ", // "Press to speak" refined
      "searchPlaceholder": "Ṣàwárì àwùjọ àwùn lórí ìlòpọ̀", // "Search for places on a map" adjusted for accuracy
      "suggestionsTitle": "Àwòrán Ìdáhùn AI",
      "noSuggestions": "Kò sí ìdáhùn tí ó ṣeé ṣe",
    }
  },
  ha: {
    translation: {
      "voiceButton": "Danna don magana", // "Press to speak"
      "searchPlaceholder": "Bincika wurare a kan taswira", // Refined "Search for places on a map"
      "suggestionsTitle": "Shawara AI",
      "noSuggestions": "Babu shawara da ake bayarwa",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;