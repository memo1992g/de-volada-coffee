export default function Logo({ compact = false }) {
  return (
    <a className={`brand-logo ${compact ? 'brand-logo--compact' : ''}`} href="#inicio" aria-label="De Volada Coffee Company">
      <span className="brand-logo__mark">
        <video className="brand-logo__video" autoPlay muted playsInline preload="auto">
          <source src="/videos/logo-reveal.mp4" type="video/mp4" />
          <span className="brand-logo__bird">DV</span>
        </video>
      </span>
      {!compact && (
        <span className="brand-logo__copy">
          <strong>De Volada</strong>
          <small>Coffee Company</small>
        </span>
      )}
    </a>
  );
}
