import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '../animations.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import Logo from './Logo.jsx';

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <motion.div
        className="container footer__grid"
        variants={shouldReduceMotion ? undefined : staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div className="footer__brand" variants={shouldReduceMotion ? undefined : fadeUp}>
          <Logo />
          <p>{t.footer.brandText}</p>
          <strong>{t.footer.brandTagline}</strong>
        </motion.div>
        {t.footer.columns.map((column) => (
          <motion.div className="footer__column" key={column.title} variants={shouldReduceMotion ? undefined : fadeUp}>
            <h3>{column.title}</h3>
            {column.links.map((link) => (
              <a href="#inicio" key={link}>
                {link}
              </a>
            ))}
          </motion.div>
        ))}
      </motion.div>
      <div className="container footer__bottom">
        <p>{t.footer.copyright}</p>
        <div>
          {t.footer.legal.map((link) => (
            <a href="#inicio" key={link}>{link}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
