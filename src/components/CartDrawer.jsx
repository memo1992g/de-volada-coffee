import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, ChevronLeft, MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useCart } from '../cart/CartContext.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const WHATSAPP_ORDER_NUMBER = '17042935739';

function formatMoney(value) {
  return `$${value.toFixed(2)}`;
}

export default function CartDrawer() {
  const {
    clearCart,
    closeCart,
    decreaseItem,
    increaseItem,
    isCartOpen,
    items,
    removeItem,
    totals,
  } = useCart();
  const { t } = useLanguage();
  const [step, setStep] = useState('cart');
  const [form, setForm] = useState({
    address: '',
    city: '',
    email: '',
    name: '',
    payment: 'card',
    phone: '',
  });

  const orderNumber = useMemo(() => `DV-${Math.floor(10000 + Math.random() * 89999)}`, [step]);
  const whatsappHref = useMemo(() => {
    const orderLines = items
      .map((item) => `• ${item.quantity}x ${item.name} (${item.price})`)
      .join('\n');
    const message = [
      'Hola De Volada Coffee Company, quiero confirmar este pedido demo:',
      orderLines,
      `Total: ${formatMoney(totals.total)}`,
      form.name ? `Nombre: ${form.name}` : '',
      form.city ? `Ciudad: ${form.city}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [form.city, form.name, items, totals.total]);

  useEffect(() => {
    if (!isCartOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen]);

  const handleClose = () => {
    closeCart();
    window.setTimeout(() => setStep('cart'), 240);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStep('done');
  };

  const handleNewOrder = () => {
    clearCart();
    setForm({
      address: '',
      city: '',
      email: '',
      name: '',
      payment: 'card',
      phone: '',
    });
    setStep('cart');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.button
            className="cart-overlay"
            type="button"
            aria-label={t.cart.close}
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="cart-drawer"
            aria-label={t.cart.title}
            initial={{ x: '105%' }}
            animate={{ x: 0 }}
            exit={{ x: '105%' }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="cart-drawer__header">
              <div>
                <p className="eyebrow">{t.cart.subtitle}</p>
                <h2>{t.cart.title}</h2>
              </div>
              <button type="button" onClick={handleClose} aria-label={t.cart.close}>
                <X size={22} />
              </button>
            </header>

            <div className="checkout-steps" aria-hidden="true">
              <span className={step === 'cart' ? 'active' : ''}>{t.cart.stepCart}</span>
              <span className={step === 'info' ? 'active' : ''}>{t.cart.stepInfo}</span>
              <span className={step === 'done' ? 'active' : ''}>{t.cart.stepDone}</span>
            </div>

            {step === 'cart' && (
              <div className="cart-drawer__body">
                {items.length === 0 ? (
                  <div className="cart-empty">
                    <ShoppingBag size={46} />
                    <h3>{t.cart.emptyTitle}</h3>
                    <p>{t.cart.emptyText}</p>
                    <button type="button" onClick={handleClose}>
                      {t.cart.continueShopping}
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="cart-items">
                      {items.map((item) => (
                        <article className="cart-item" key={item.slug}>
                          <div className={`cart-item__thumb coffee-bag--${item.accent}`}>
                            <span>DV</span>
                          </div>
                          <div className="cart-item__details">
                            <div>
                              <h3>{item.name}</h3>
                              <p>{item.badge} • {item.weight}</p>
                            </div>
                            <strong>{item.price}</strong>
                            <div className="quantity-control" aria-label={t.cart.quantity}>
                              <button type="button" onClick={() => decreaseItem(item.slug)}>
                                <Minus size={14} />
                              </button>
                              <span>{item.quantity}</span>
                              <button type="button" onClick={() => increaseItem(item.slug)}>
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                          <button className="cart-item__remove" type="button" onClick={() => removeItem(item.slug)}>
                            <Trash2 size={17} />
                            {t.cart.remove}
                          </button>
                        </article>
                      ))}
                    </div>
                    <CartSummary totals={totals} labels={t.cart} />
                    <button className="cart-primary" type="button" onClick={() => setStep('info')}>
                      {t.cart.checkout}
                    </button>
                  </>
                )}
              </div>
            )}

            {step === 'info' && (
              <form className="checkout-form" onSubmit={handleSubmit}>
                <button className="cart-back" type="button" onClick={() => setStep('cart')}>
                  <ChevronLeft size={17} />
                  {t.cart.back}
                </button>
                <div>
                  <h3>{t.cart.formTitle}</h3>
                  <p>{t.cart.formText}</p>
                </div>
                <label>
                  {t.cart.name}
                  <input
                    required
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                  />
                </label>
                <label>
                  {t.cart.email}
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                  />
                </label>
                <label>
                  {t.cart.phone}
                  <input
                    required
                    value={form.phone}
                    onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  />
                </label>
                <label>
                  {t.cart.address}
                  <input
                    required
                    value={form.address}
                    onChange={(event) => setForm({ ...form, address: event.target.value })}
                  />
                </label>
                <label>
                  {t.cart.city}
                  <input
                    required
                    value={form.city}
                    onChange={(event) => setForm({ ...form, city: event.target.value })}
                  />
                </label>
                <label>
                  {t.cart.payment}
                  <select
                    value={form.payment}
                    onChange={(event) => setForm({ ...form, payment: event.target.value })}
                  >
                    <option value="card">{t.cart.card}</option>
                    <option value="cash">{t.cart.cash}</option>
                  </select>
                </label>
                <CartSummary totals={totals} labels={t.cart} />
                <button className="cart-primary" type="submit">
                  {t.cart.placeOrder}
                </button>
                <a className="cart-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer">
                  <MessageCircle size={17} />
                  {t.cart.whatsapp}
                </a>
              </form>
            )}

            {step === 'done' && (
              <div className="checkout-success">
                <CheckCircle2 size={58} />
                <p className="eyebrow">{t.cart.orderNumber} {orderNumber}</p>
                <h3>{t.cart.successTitle}</h3>
                <p>{t.cart.successText}</p>
                <CartSummary totals={totals} labels={t.cart} />
                <button className="cart-primary" type="button" onClick={handleNewOrder}>
                  {t.cart.newOrder}
                </button>
                <a className="cart-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer">
                  <MessageCircle size={17} />
                  {t.cart.whatsapp}
                </a>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function CartSummary({ totals, labels }) {
  return (
    <div className="cart-summary">
      <div>
        <span>{labels.subtotal}</span>
        <strong>{formatMoney(totals.subtotal)}</strong>
      </div>
      <div>
        <span>{labels.shipping}</span>
        <strong>{formatMoney(totals.shipping)}</strong>
      </div>
      <div>
        <span>{labels.impact}</span>
        <strong>{formatMoney(totals.impact)}</strong>
      </div>
      <div className="cart-summary__total">
        <span>{labels.total}</span>
        <strong>{formatMoney(totals.total)}</strong>
      </div>
    </div>
  );
}
