export const languages = ["en", "fr"] as const;
export type Language = (typeof languages)[number];

export const defaultLang: Language = "en";

export const translations: Record<Language, Record<string, string>> = {
  en: {
    home: "Home",
    menu: "Menu",
    gallery: "Gallery",
    about: "About",
    contact: "Contact",
    welcome: "Welcome to The Kitch",
    tagline: "Brunch, specials, and good vibes in Rabat."
  },
  fr: {
    home: "Accueil",
    menu: "Menu",
    gallery: "Galerie",
    about: "À propos",
    contact: "Contact",
    welcome: "Bienvenue à The Kitch",
    tagline: "Brunch, spécialités et bonne ambiance à Rabat."
  }
};
