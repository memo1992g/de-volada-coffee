import { motion, useReducedMotion } from 'framer-motion';
import { RotateCcw, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { cardReveal, fadeUp, staggerContainer, viewportOnce } from '../animations.js';
import { useCart } from '../cart/CartContext.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function CoffeeQuiz() {
  const shouldReduceMotion = useReducedMotion();
  const { addItem } = useCart();
  const { t } = useLanguage();
  const [answers, setAnswers] = useState({
    method: 'espresso',
    moment: 'morning',
    strength: 'medium',
  });

  const match = useMemo(() => {
    if (answers.moment === 'gift') return t.products.find((product) => product.slug === 'te-volaste');
    if (answers.strength === 'soft') return t.products.find((product) => product.slug === 'vaya-pues');
    if (answers.strength === 'strong') return t.products.find((product) => product.slug === 'levanta-muertos');
    return t.products.find((product) => product.slug === 'ponte-las-pilas');
  }, [answers, t.products]);

  return (
    <section className="section quiz-section" id="quiz">
      <div className="container quiz-layout">
        <motion.div
          className="quiz-copy"
          variants={shouldReduceMotion ? undefined : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="eyebrow">{t.quiz.eyebrow}</p>
          <h2>{t.quiz.title}</h2>
          <p>{t.quiz.text}</p>
        </motion.div>

        <motion.div
          className="quiz-card"
          variants={shouldReduceMotion ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {t.quiz.questions.map((question) => (
            <motion.div className="quiz-question" key={question.id} variants={cardReveal}>
              <h3>{question.title}</h3>
              <div>
                {question.options.map((option) => (
                  <button
                    className={answers[question.id] === option.value ? 'active' : ''}
                    type="button"
                    key={option.value}
                    onClick={() => setAnswers({ ...answers, [question.id]: option.value })}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.aside
          className="quiz-result"
          variants={shouldReduceMotion ? undefined : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Sparkles size={26} />
          <span>{t.quiz.resultTitle}</span>
          <h3>{match.name}</h3>
          <p>{match.description}</p>
          <strong>{match.price}</strong>
          <button type="button" onClick={() => addItem(match)}>
            {t.quiz.add}
          </button>
          <button
            className="quiz-reset"
            type="button"
            onClick={() => setAnswers({ method: 'espresso', moment: 'morning', strength: 'medium' })}
          >
            <RotateCcw size={15} />
            {t.quiz.reset}
          </button>
        </motion.aside>
      </div>
    </section>
  );
}
