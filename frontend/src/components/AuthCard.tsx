import React from 'react';

export interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export const AuthCard: React.FC<AuthCardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-zinc-950/70 border border-zinc-900/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 sm:p-10 max-w-md w-full mx-auto relative overflow-hidden group hardware-sharp font-sans ${className}`}
      style={{
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'subpixel-antialiased',
      }}
    >
      {/* Top Ambient Specular Light Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-xs opacity-50"></div>

      {/* Card Content Container */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AuthCard;
