import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          nav: {
            home: "Home",
            shop: "Shop",
            about: "About",
            contact: "Contact",
            cart: "Cart",
            wishlist: "Wishlist",
            search: "Search"
          },
          home: {
            hero: {
              subtitle: "Experience the future of fashion",
              cta: "Explore Now"
            },
            featured: {
              title: "Dream Flyever Hoodie",
              description: "Our signature hoodie, crafted with premium materials and innovative design. Experience comfort and style like never before.",
              cta: "Shop Now"
            },
            collections: {
              title: "Latest Collections",
              hoodies: "Hoodies",
              tshirts: "T-Shirts",
              pants: "Pants"
            }
          }
        }
      },
      de: {
        translation: {
          nav: {
            home: "Start",
            shop: "Shop",
            about: "Über uns",
            contact: "Kontakt",
            cart: "Warenkorb",
            wishlist: "Wunschliste",
            search: "Suche"
          },
          home: {
            hero: {
              subtitle: "Erlebe die Zukunft der Mode",
              cta: "Jetzt Entdecken"
            },
            featured: {
              title: "Dream Flyever Hoodie",
              description: "Unser Signature-Hoodie, gefertigt aus Premium-Materialien mit innovativem Design. Erlebe Komfort und Stil wie nie zuvor.",
              cta: "Jetzt Kaufen"
            },
            collections: {
              title: "Aktuelle Kollektionen",
              hoodies: "Hoodies",
              tshirts: "T-Shirts",
              pants: "Hosen"
            }
          }
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
