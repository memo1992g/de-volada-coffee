import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Bean, Flame, PackageCheck, Sparkles } from 'lucide-react';
import { cardReveal, fadeUp, staggerContainer, viewportOnce } from '../animations.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const icons = [Bean, Flame, PackageCheck, Sparkles];

export default function RoastJourney() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section className="section journey-section">
      <div className="container journey-layout">
        <motion.div
          className="journey-sticky"
          variants={shouldReduceMotion ? undefined : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="eyebrow">{t.journey.eyebrow}</p>
          <h2>{t.journey.title}</h2>
          <ArrowDown size={34} />
        </motion.div>
        <motion.div
          className="journey-steps"
          variants={shouldReduceMotion ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {t.journey.steps.map((step, index) => {
            const Icon = icons[index];

            return (
              <motion.article className="journey-card" key={step.label} variants={cardReveal}>
                <span>{step.label}</span>
                <Icon size={30} />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
