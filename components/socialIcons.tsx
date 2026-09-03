type IconProps = { className?: string };

const base = "h-5 w-5 shrink-0";

export function WhatsAppIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className} aria-hidden>
      <path d="M12 3.5a8.5 8.5 0 0 0-7.34 12.77L3.5 20.5l4.36-1.14A8.5 8.5 0 1 0 12 3.5Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.7 8.4c.2-.45.4-.46.6-.47h.5c.16 0 .38-.06.6.46.22.53.75 1.84.82 1.97.06.14.1.3.02.48-.09.18-.13.29-.26.44-.13.16-.27.35-.39.47-.13.13-.26.27-.11.53.15.27.68 1.13 1.47 1.83.85.75 1.55 1 1.82 1.11.28.11.44.09.6-.06.17-.16.71-.83.9-1.11.19-.28.38-.24.63-.15.26.1 1.63.77 1.9.91.28.14.46.21.53.33.07.12.07.68-.16 1.34-.23.65-1.34 1.24-1.87 1.32-.48.08-1.08.11-1.75-.11-.4-.13-.92-.3-1.58-.6-2.79-1.2-4.6-4.02-4.75-4.21-.14-.19-1.13-1.5-1.13-2.86 0-1.36.71-2.02.96-2.3Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FacebookIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className} aria-hidden>
      <path d="M15 8.5h-2a1.5 1.5 0 0 0-1.5 1.5v2H15l-.5 3H11.5v7h-3v-7H6.5v-3H8.5v-2.3A4.2 4.2 0 0 1 12.7 5.5H15v3Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TikTokIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className} aria-hidden>
      <path d="M14 3.5v11.2a3.3 3.3 0 1 1-3.3-3.3c.28 0 .55.03.8.09" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 3.5c.4 2.2 2.1 3.8 4.3 4V10c-1.6 0-3.1-.5-4.3-1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function InstagramIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.7" />
      <path d="M16.7 7.3h.01" strokeLinecap="round" />
    </svg>
  );
}

export function YouTubeIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className} aria-hidden>
      <rect x="2.5" y="6" width="19" height="12" rx="3" />
      <path d="M10.5 9.5v5l4.3-2.5-4.3-2.5Z" strokeLinejoin="round" />
    </svg>
  );
}

export function LinkGlobeIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className} aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.2 2.3 3.3 5.2 3.3 8.5s-1.1 6.2-3.3 8.5c-2.2-2.3-3.3-5.2-3.3-8.5S9.8 5.8 12 3.5Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
