import { motion, useReducedMotion } from 'framer-motion';
import { CupSoda, Heart, ArrowRight } from 'lucide-react';
import { fadeUp, viewportOnce } from '../animations.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function AboutSection() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section className="about" id="nosotros">
      <motion.div
        className="about__image"
        aria-label={t.about.imageLabel}
        initial={shouldReduceMotion ? false : { opacity: 0, x: -54 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="roaster-glow" />
      </motion.div>
      <motion.div
        className="about__copy"
        variants={shouldReduceMotion ? undefined : fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <p className="eyebrow">{t.about.eyebrow}</p>
        <h2>
          {t.about.titleTop}
          <span> {t.about.titleAccent}</span>
        </h2>
        <p>{t.about.text}</p>
        <div className="origin-row">
          <span>🇺🇸</span>
          <span>🇸🇻</span>
          <span>☕</span>
          <strong>CMS</strong>
        </div>
      </motion.div>
      <motion.aside
        className="impact-card"
        id="impacto"
        initial={shouldReduceMotion ? false : { opacity: 0, x: 54, scale: 0.96 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6 }}
      >
        <Heart size={25} />
        <h3>
          {t.about.impactTitle[0]}
          <span> {t.about.impactTitle[1]}</span>
          <strong> {t.about.impactTitle[2]}</strong>
        </h3>
        <p>{t.about.impactText}</p>
        <a className="button button--outline" href="#contacto">
          {t.about.impactCta} <ArrowRight size={16} />
        </a>
        <CupSoda className="impact-card__cup" size={72} />
      </motion.aside>
    </section>
  );
}
