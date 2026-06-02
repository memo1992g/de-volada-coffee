import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '../animations.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import ProductCard from './ProductCard.jsx';

export default function ProductSection() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section className="section product-section" id="tienda">
      <div className="container">
        <motion.div
          className="section-heading"
          variants={shouldReduceMotion ? undefined : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="eyebrow">{t.productsSection.eyebrow}</p>
          <h2>{t.productsSection.title}</h2>
        </motion.div>
        <motion.div
          className="product-grid"
          variants={shouldReduceMotion ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {t.products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
