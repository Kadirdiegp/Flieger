import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FLEYVER</h2>
            <p className="text-gray-400">
              Premium Streetwear, designed in Germany
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop?category=hoodies" className="text-gray-400 hover:text-white">
                  Hoodies
                </Link>
              </li>
              <li>
                <Link to="/shop?category=tshirts" className="text-gray-400 hover:text-white">
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link to="/shop?category=pants" className="text-gray-400 hover:text-white">
                  Hosen
                </Link>
              </li>
            </ul>
          </div>

          {/* Info Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Info</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  Über uns
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white">
                  Versand
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Melde dich für unseren Newsletter an und erhalte 10% auf deine erste Bestellung
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Deine E-Mail Adresse"
                className="w-full px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:border-white"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors"
              >
                Anmelden
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} FLEYVER. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};