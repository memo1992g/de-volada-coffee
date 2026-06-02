import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, ShoppingCart } from 'lucide-react';
import { useCart } from '../cart/CartContext.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function CartToast() {
  const { lastAdded, openCart } = useCart();
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {lastAdded && (
        <motion.div
          className="cart-toast"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <CheckCircle2 size={22} />
          <div>
            <strong>{t.productLabels.added}</strong>
            <span>{lastAdded.name}</span>
          </div>
          <button type="button" onClick={openCart}>
            <ShoppingCart size={16} />
            {t.nav.cart}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
