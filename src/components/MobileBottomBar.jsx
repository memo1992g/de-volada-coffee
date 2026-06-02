import { Bot, Home, MessageCircle, ShoppingCart, Store } from 'lucide-react';
import { useCart } from '../cart/CartContext.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const WHATSAPP_ORDER_NUMBER = '17042935739';

export default function MobileBottomBar({ onOpenAi }) {
  const { openCart, totals } = useCart();
  const { t } = useLanguage();

  return (
    <nav className="mobile-bottom-bar" aria-label="Mobile quick actions">
      <a href="#inicio">
        <Home size={19} />
        {t.mobileBar.home}
      </a>
      <a href="#tienda">
        <Store size={19} />
        {t.mobileBar.coffee}
      </a>
      <button type="button" onClick={openCart}>
        <ShoppingCart size={19} />
        {t.mobileBar.cart}
        <span>{totals.count}</span>
      </button>
      <button className="mobile-bottom-bar__ai" type="button" onClick={onOpenAi}>
        <Bot size={19} />
        Coffee IA
      </button>
      <a href={`https://wa.me/${WHATSAPP_ORDER_NUMBER}`} target="_blank" rel="noreferrer">
        <MessageCircle size={19} />
        {t.mobileBar.whatsapp}
      </a>
    </nav>
  );
}
