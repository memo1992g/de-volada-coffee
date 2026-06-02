import { Search, UserRound, ShoppingCart } from 'lucide-react';
import { useCart } from '../cart/CartContext.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import Logo from './Logo.jsx';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { openCart, totals } = useCart();

  return (
    <header className="header">
      <nav className="navbar" aria-label={t.nav.aria}>
        <Logo />
        <div className="nav-links">
          {t.nav.items.map((item, index) => (
            <a className={index === 0 ? 'active' : ''} href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="nav-actions" aria-label={t.nav.actions}>
          <div className="language-toggle" aria-label="Language selector">
            <button
              className={language === 'es' ? 'active' : ''}
              type="button"
              onClick={() => setLanguage('es')}
              aria-pressed={language === 'es'}
            >
              ES
            </button>
            <button
              className={language === 'en' ? 'active' : ''}
              type="button"
              onClick={() => setLanguage('en')}
              aria-pressed={language === 'en'}
            >
              EN
            </button>
          </div>
          <button aria-label={t.nav.search}>
            <Search size={21} />
          </button>
          <button aria-label={t.nav.account}>
            <UserRound size={21} />
          </button>
          <button className="cart-button" aria-label={t.nav.cart} onClick={openCart}>
            <ShoppingCart size={21} />
            <span>{totals.count}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
