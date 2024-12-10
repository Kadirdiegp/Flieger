import React from 'react';
import { motion } from 'framer-motion';
import { ProductStats } from '../components/SocialProof';
import { RotatingCube } from '../components/3d/RotatingCube';
import { InteractiveHoodie } from '../components/3d/InteractiveHoodie';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; // Import Link component

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/keagan-henman-Won79_9oUEk-unsplash.jpg"
            alt="Fashion Background"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
          <RotatingCube />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-8xl font-bold mb-2"
          >
            DREAM
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            FLEYVER
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-neutral-400 mb-8"
          >
            {t('home.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Featured Product */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[600px]">
              <InteractiveHoodie />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('home.featured.title')}</h2>
              <p className="text-neutral-400 mb-8">
                {t('home.featured.description')}
              </p>
              <ProductStats productId="featured" />
              <Link to="/shop?product=premium-hoodie">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full md:w-auto px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors"
                >
                  {t('home.featured.cta')}
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {t('home.collections.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 'hoodies',
                image: '/images/hoodie-collection.jpg'
              },
              {
                id: 'tshirts',
                image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=2127&auto=format&fit=crop'
              },
              {
                id: 'pants',
                image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1974&auto=format&fit=crop'
              }
            ].map((category) => (
              <Link to={`/shop?category=${category.id}`} key={category.id}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="relative aspect-[3/4] overflow-hidden rounded-lg group cursor-pointer"
                >
                  <img
                    src={category.image}
                    alt={t(`home.collections.${category.id}`)}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <h3 className="text-2xl font-bold">
                      {t(`home.collections.${category.id}`)}
                    </h3>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-lg font-medium">
                      Kollektion ansehen
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;