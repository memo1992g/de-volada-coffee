import { motion, useReducedMotion } from 'framer-motion';
import { Send } from 'lucide-react';
import { fadeUp, viewportOnce } from '../animations.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Newsletter() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <motion.section
      className="newsletter"
      id="contacto"
      variants={shouldReduceMotion ? undefined : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.div
        className="newsletter__cups"
        aria-hidden="true"
        animate={shouldReduceMotion ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span />
        <span />
      </motion.div>
      <div className="newsletter__copy">
        <Send size={38} />
        <div>
          <h2>{t.newsletter.title}</h2>
          <p>{t.newsletter.text}</p>
        </div>
      </div>
      <form className="newsletter__form">
        <label className="sr-only" htmlFor="email">
          {t.newsletter.label}
        </label>
        <input id="email" type="email" placeholder={t.newsletter.placeholder} />
        <button type="submit">{t.newsletter.button}</button>
      </form>
    </motion.section>
  );
}
