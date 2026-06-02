import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cardReveal, fadeUp, staggerContainer, viewportOnce } from '../animations.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Testimonials() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section className="section testimonials">
      <div className="container">
        <motion.div
          className="section-heading"
          variants={shouldReduceMotion ? undefined : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="eyebrow">{t.testimonialsSection.eyebrow}</p>
          <h2>{t.testimonialsSection.title}</h2>
        </motion.div>
        <div className="testimonial-row">
          <button className="slider-arrow" aria-label={t.testimonialsSection.prev}>
            <ChevronLeft size={24} />
          </button>
          <motion.div
            className="testimonial-grid"
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {t.testimonials.map((testimonial) => (
              <motion.article
                className="testimonial-card"
                key={testimonial.name}
                variants={cardReveal}
                whileHover={{ y: -7, scale: 1.01 }}
              >
                <div className="avatar">{testimonial.avatar}</div>
                <div>
                  <div className="stars" aria-label={t.testimonialsSection.stars}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star fill="currentColor" size={18} key={index} />
                    ))}
                  </div>
                  <p>“{testimonial.quote}”</p>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.city}</span>
                </div>
              </motion.article>
            ))}
          </motion.div>
          <button className="slider-arrow" aria-label={t.testimonialsSection.next}>
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
