import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Bean, MapPin, Volume2, VolumeX, Zap } from 'lucide-react';
import { fadeIn, fadeUp, staggerContainer } from '../animations.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();
  const videoRef = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const syncVideoSound = (enabled) => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = !enabled;
    video.defaultMuted = !enabled;
    video.volume = enabled ? 0.55 : 0;
    setSoundEnabled(enabled);
  };

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    syncVideoSound(true);

    const playAttempt = video.play();

    if (playAttempt?.catch) {
      playAttempt.catch(() => {
        syncVideoSound(false);
        video.play();
      });
    }
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    syncVideoSound(!soundEnabled);
    video.play();
  };

  return (
    <section className="hero" id="inicio">
      <div className="hero__video" aria-hidden="true">
        <video ref={videoRef} autoPlay loop playsInline preload="auto" poster="/posters/hero-poster.svg">
          <source src="/videos/hero-coffee.mp4" type="video/mp4" />
        </video>
      </div>
      <button className="hero__sound-toggle" type="button" onClick={toggleSound}>
        {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        {soundEnabled ? t.hero.soundOn : t.hero.soundOff}
      </button>
      <motion.div
        className="hero__content container"
        variants={shouldReduceMotion ? undefined : staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>
          {t.hero.eyebrow}
        </motion.p>
        <motion.h1 variants={shouldReduceMotion ? undefined : fadeUp}>
          {t.hero.titleTop}
          <span> {t.hero.titleMiddle} <strong>{t.hero.titleAccent}</strong></span>
        </motion.h1>
        <motion.p className="hero__description" variants={shouldReduceMotion ? undefined : fadeUp}>
          {t.hero.description}
        </motion.p>
        <motion.div className="hero__buttons" variants={shouldReduceMotion ? undefined : fadeUp}>
          <motion.a className="button button--gold" href="#tienda" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            {t.hero.primaryCta} <Zap size={16} />
          </motion.a>
          <motion.a className="button button--outline" href="#cafés" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            {t.hero.secondaryCta}
          </motion.a>
        </motion.div>
        <motion.div className="hero__badges" variants={shouldReduceMotion ? undefined : fadeIn}>
          <span><Bean size={18} /> {t.hero.badges[0]}</span>
          <span><MapPin size={18} /> {t.hero.badges[1]}</span>
          <span><Zap size={18} /> {t.hero.badges[2]}</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
