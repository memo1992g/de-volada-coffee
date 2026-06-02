import { motion, useReducedMotion } from 'framer-motion';
import { LockKeyhole, MessageCircle, PackageCheck, Truck } from 'lucide-react';
import { cardReveal, staggerContainer, viewportOnce } from '../animations.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const benefitIcons = [Truck, LockKeyhole, PackageCheck, MessageCircle];

export default function BenefitsBar() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section className="benefits">
      <motion.div
        className="container benefits__grid"
        variants={shouldReduceMotion ? undefined : staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {t.benefits.map(({ title, text }, index) => {
          const Icon = benefitIcons[index];

          return (
          <motion.article className="benefit" key={title} variants={cardReveal} whileHover={{ y: -5 }}>
            <Icon size={36} />
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
