import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { fadeUp, staggerContainer, viewportOnce } from '../animations.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function ImpactCounters() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section className="impact-counters">
      <div className="container">
        <motion.div
          className="section-heading"
          variants={shouldReduceMotion ? undefined : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="eyebrow">{t.counters.eyebrow}</p>
          <h2>{t.counters.title}</h2>
        </motion.div>
        <motion.div
          className="counter-grid"
          variants={shouldReduceMotion ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {t.counters.items.map((item) => (
            <CounterCard item={item} key={item.label} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CounterCard({ item }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const value = useMotionValue(0);
  const spring = useSpring(value, { stiffness: 80, damping: 18 });
  const rounded = useTransform(spring, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      value.set(item.value);
    }
  }, [inView, item.value, value]);

  return (
    <article className="counter-card" ref={ref}>
      <strong>
        <motion.span>{rounded}</motion.span>
        {item.suffix}
      </strong>
      <p>{item.label}</p>
    </article>
  );
}
