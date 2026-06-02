import { motion, useReducedMotion } from 'framer-motion';
import { Flame, HelpCircle, ShieldCheck } from 'lucide-react';
import { cardReveal, fadeUp, staggerContainer, viewportOnce } from '../animations.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const icons = [Flame, ShieldCheck, HelpCircle];

export default function TrustSection() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section className="section trust-section">
      <div className="container">
        <motion.div
          className="section-heading"
          variants={shouldReduceMotion ? undefined : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="eyebrow">{t.trust.eyebrow}</p>
          <h2>{t.trust.title}</h2>
        </motion.div>

        <motion.div
          className="trust-grid"
          variants={shouldReduceMotion ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {t.trust.cards.map((card, index) => {
            const Icon = icons[index];

            return (
              <motion.article className="trust-card" key={card.title} variants={cardReveal}>
                <Icon size={30} />
                <span>{card.stat}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </motion.article>
            );
          })}
        </motion.div>

        <div className="faq-panel">
          <h3>{t.trust.faqTitle}</h3>
          {t.trust.faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
