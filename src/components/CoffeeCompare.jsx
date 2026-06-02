import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../animations.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function CoffeeCompare() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section className="section compare-section">
      <div className="container">
        <motion.div
          className="section-heading"
          variants={shouldReduceMotion ? undefined : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="eyebrow">{t.compare.eyebrow}</p>
          <h2>{t.compare.title}</h2>
        </motion.div>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                {t.compare.columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.compare.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => (
                    <td data-label={t.compare.columns[index]} key={`${row[0]}-${cell}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
