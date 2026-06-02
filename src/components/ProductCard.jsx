import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { cardReveal } from '../animations.js';
import { useCart } from '../cart/CartContext.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function ProductCard({ product }) {
  const { t } = useLanguage();
  const { addItem } = useCart();

  return (
    <motion.article
      className="product-card"
      variants={cardReveal}
      whileHover={{ y: -10, scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="product-card__topline">
        <span>{product.badge}</span>
        <span>{product.weight}</span>
      </div>
      <div className="product-card__media">
        <div className={`coffee-bag coffee-bag--${product.accent}`} aria-label={`Bolsa premium ${product.name}`}>
          <div className="coffee-bag__seal">DV</div>
          <div className="coffee-bag__name">{product.name}</div>
        </div>
      </div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <dl className="product-meta">
        <div>
          <dt>{t.productLabels.origin}</dt>
          <dd>{product.origin}</dd>
        </div>
        <div>
          <dt>{t.productLabels.notes}</dt>
          <dd>{product.notes}</dd>
        </div>
        <div>
          <dt>{t.productLabels.intensity}</dt>
          <dd>{product.intensity}</dd>
        </div>
      </dl>
      <strong>{product.price}</strong>
      <button type="button" onClick={() => addItem(product)}>
        <ShoppingCart size={16} />
        {t.productLabels.addToCart}
      </button>
    </motion.article>
  );
}
