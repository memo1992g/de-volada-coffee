import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Send, Sparkles, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useCart } from '../cart/CartContext.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';

function getRecommendationKey(message) {
  const normalized = message.toLowerCase();

  if (/energ|pilas|work|morning|mañana|trabajo/.test(normalized)) return 'energy';
  if (/suave|smooth|balance|light|ligero/.test(normalized)) return 'soft';
  if (/regalo|gift|special|especial/.test(normalized)) return 'gift';
  if (/impact|impacto|niñ|purpose|propósito|proposito/.test(normalized)) return 'impact';
  if (/fuerte|strong|dark|oscuro|muertos|intens/.test(normalized)) return 'strong';

  return 'default';
}

function getProductSlug(key) {
  const map = {
    default: 'ponte-las-pilas',
    energy: 'ponte-las-pilas',
    gift: 'te-volaste',
    impact: 'ponte-las-pilas',
    soft: 'vaya-pues',
    strong: 'levanta-muertos',
  };

  return map[key] || map.default;
}

export default function AiConcierge() {
  const { addItem } = useCart();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [recommendationSlug, setRecommendationSlug] = useState('ponte-las-pilas');
  const [messages, setMessages] = useState(() => [
    {
      role: 'assistant',
      text: t.ai.intro,
    },
  ]);

  const recommendedProduct = useMemo(
    () => t.products.find((product) => product.slug === recommendationSlug) || t.products[1],
    [recommendationSlug, t.products],
  );

  const askDemoAi = (message) => {
    if (!message.trim()) {
      return;
    }

    const key = getRecommendationKey(message);
    const nextSlug = getProductSlug(key);
    const response = key === 'default' ? t.ai.defaultResponse : t.ai.responses[key];

    setRecommendationSlug(nextSlug);
    setMessages((current) => [
      ...current,
      { role: 'user', text: message },
      { role: 'assistant', text: response },
    ]);
    setInput('');
  };

  const addRecommendedProduct = () => {
    setIsOpen(false);
    window.setTimeout(() => addItem(recommendedProduct), 180);
  };

  return (
    <>
      <motion.button
        className="ai-launcher"
        type="button"
        onClick={() => setIsOpen(true)}
        whileHover={{ y: -4, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Sparkles size={18} />
        {t.ai.launcher}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className="ai-panel"
            initial={{ opacity: 0, y: 26, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 26, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="ai-panel__header">
              <div>
                <p className="eyebrow">{t.ai.eyebrow}</p>
                <h2>{t.ai.title}</h2>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Close AI demo">
                <X size={20} />
              </button>
            </header>

            <div className="ai-disclaimer">
              <Bot size={17} />
              {t.ai.disclaimer}
            </div>

            <div className="ai-messages">
              {messages.map((message, index) => (
                <div className={`ai-message ai-message--${message.role}`} key={`${message.role}-${index}`}>
                  {message.role === 'assistant' && <strong>{t.ai.botName}</strong>}
                  <p>{message.text}</p>
                </div>
              ))}
            </div>

            <div className="ai-recommendation">
              <span>{recommendedProduct.badge}</span>
              <h3>{recommendedProduct.name}</h3>
              <p>{recommendedProduct.description}</p>
              <button type="button" onClick={addRecommendedProduct}>
                {t.ai.addRecommendation}
              </button>
            </div>

            <div className="ai-prompts">
              {t.ai.quickPrompts.map((prompt) => (
                <button type="button" key={prompt} onClick={() => askDemoAi(prompt)}>
                  {prompt}
                </button>
              ))}
            </div>

            <form
              className="ai-form"
              onSubmit={(event) => {
                event.preventDefault();
                askDemoAi(input);
              }}
            >
              <input
                value={input}
                placeholder={t.ai.inputPlaceholder}
                onChange={(event) => setInput(event.target.value)}
              />
              <button type="submit" aria-label={t.ai.send}>
                <Send size={17} />
              </button>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
