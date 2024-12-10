import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-20">
      <section className="relative h-[60vh] bg-neutral-900">
        <img
          src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3"
          alt="Team working"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white">Unsere Geschichte</h1>
        </div>
      </section>

      <section className="bg-black py-24">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-12 text-white text-center">Jung, Digital, Anders</h2>
            <div className="space-y-8">
              <p className="text-xl text-gray-300 leading-relaxed">
                Geboren aus der Vision einer neuen Generation, starteten wir 2024 als junges Team in Berlin. 
                Mit frischen Ideen und dem Mut, Mode neu zu denken, sind wir angetreten, um die Fashion-Welt 
                zu revolutionieren.
              </p>
              <p className="text-xl text-gray-300 leading-relaxed">
                Was uns besonders macht? Wir sind Digital Natives, die verstehen, was unsere Generation will. 
                Keine komplizierten Hierarchien, keine verstaubten Traditionen - nur ehrliche Mode, die 
                Qualität und Nachhaltigkeit vereint.
              </p>
              <p className="text-xl text-gray-300 leading-relaxed">
                Heute, in unserem Gründungsjahr, wachsen wir mit einer Community von Gleichgesinnten, 
                die unsere Vision teilen: Mode soll Spaß machen, nachhaltig sein und jeden 
                individuellen Style unterstützen.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-black">Unsere Werte</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <h3 className="text-xl font-semibold mb-4 text-black">Nachhaltigkeit</h3>
              <p className="text-neutral-700">
                Unsere Generation denkt um: Wir produzieren ausschließlich 
                nach Bedarf und setzen auf recycelte Materialien.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <h3 className="text-xl font-semibold mb-4 text-black">Innovation</h3>
              <p className="text-neutral-700">
                Als Digital Natives nutzen wir modernste Technologien für 
                bessere Passformen und nachhaltigere Produktion.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <h3 className="text-xl font-semibold mb-4 text-black">Gemeinschaft</h3>
              <p className="text-neutral-700">
                Wir sind mehr als eine Marke - wir sind eine Bewegung von 
                jungen Menschen, die Mode neu definieren.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;