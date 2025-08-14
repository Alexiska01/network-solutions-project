// src/components/icons/CorporateIcons.tsx
import React from "react";

type P = React.SVGProps<SVGSVGElement> & { size?: number };

export const CorpLAN: React.FC<P> = ({ size = 20, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...p}>
    <rect x="3" y="3" width="18" height="10" rx="3" fill="currentColor" opacity=".16"/>
    <rect x="6" y="6" width="12" height="4" rx="1.4" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M12 13v3M8 19h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

export const CorpAccess: React.FC<P> = ({ size = 18, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M4 14a8 8 0 0116 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M7 14a5 5 0 0110 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <circle cx="12" cy="17.5" r="1.5" fill="currentColor"/>
  </svg>
);

export const CorpDistrib: React.FC<P> = ({ size = 18, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="12" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="6" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="18" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M12 8.5V11M12 11L7.5 15M12 11l4.5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

export const CorpDC: React.FC<P> = ({ size = 24, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...p}>
    <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M7 9h10M7 12h10M7 15h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

export const CorpSpine: React.FC<P> = ({ size = 18, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <circle cx="8" cy="12" r="2" fill="currentColor"/>
    <circle cx="16" cy="12" r="2" fill="currentColor"/>
  </svg>
);

export const CorpLeaf: React.FC<P> = ({ size = 18, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M12 20c4.4 0 8-3.6 8-8V6c-6 0-10 2-12 4s-2 6 4 10z" stroke="currentColor" strokeWidth="1.6" fill="currentColor" opacity=".1"/>
    <path d="M12 20C9 16 9 12 14 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);
