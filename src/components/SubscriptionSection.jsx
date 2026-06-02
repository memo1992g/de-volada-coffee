import { motion, useReducedMotion } from 'framer-motion';
import { CalendarCheck, Check } from 'lucide-react';
import { fadeUp, viewportOnce } from '../animations.js';
import { useCart } from '../cart/CartContext.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function SubscriptionSection() {
  const shouldReduceMotion = useReducedMotion();
  const { addItem } = useCart();
  const { t } = useLanguage();

  const planProduct = {
    accent: 'gold',
    badge: 'Subscription',
    description: t.subscription.productDescription,
    name: t.subscription.productName,
    price: t.subscription.price,
    slug: 'de-volada-monthly-plan',
    weight: 'Monthly',
  };

  return (
    <section className="subscription-section">
      <motion.div
        className="container subscription-card"
        variants={shouldReduceMotion ? undefined : fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div>
          <p className="eyebrow">{t.subscription.eyebrow}</p>
          <h2>{t.subscription.title}</h2>
          <p>{t.subscription.text}</p>
        </div>
        <ul>
          {t.subscription.perks.map((perk) => (
            <li key={perk}>
              <Check size={17} />
              {perk}
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => addItem(planProduct)}>
          <CalendarCheck size={18} />
          {t.subscription.cta}
        </button>
      </motion.div>
    </section>
  );
}
