import React from 'react';
import { ArrowRight, ExternalLink, Shield } from 'lucide-react';
import background from '../assets/bg.jpg';
import Button from '../components/Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 bg-black overflow-hidden select-none hardware-sharp">
      {/* 1. Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 scale-105 pointer-events-none"
        style={{
          backgroundImage: `url(${background})`,
        }}
      />

      {/* 2. Radial Blur Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#000000_80%)] pointer-events-none" />

      {/* 3. Ambient Soft Radial Light Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] sm:w-[900px] sm:h-[900px] bg-zinc-800/15 rounded-full blur-[140px] pointer-events-none" />

      {/* 4. Main Hero Typography & Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6 py-12">
        {/* Top Developer Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-sans font-medium text-zinc-300 backdrop-blur-md">
          <Shield className="w-3.5 h-3.5 zinc-400" />
          <span>Authentication Boilerplate</span>
        </div>

        {/* Main Headline with Top-to-Bottom Silver Gradient */}
        <h1 className="font-sans text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] max-w-3xl bg-gradient-to-b from-white via-zinc-100 to-zinc-400/90 bg-clip-text text-transparent">
          Auth for Developers
        </h1>

        {/* Subheading: Refined, Grammatically Perfect & Technical */}
        <p className="text-zinc-400 font-favorit text-base sm:text-lg lg:text-m font-normal max-w-3xl text-center leading-relaxed">
          A production-ready full-stack MERN and TypeScript authentication system.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <Button
            variant="primary"
            to="/register"
            iconRight={<ArrowRight className="w-4 h-4 text-black" />}
            className="px-7 py-3 text-base"
          >
            Get Started
          </Button>

          <Button
            variant="secondary"
            href="https://marcrebato.vercel.app/"
            iconRight={<ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-white" />}
            className="px-7 py-3 text-base"
          >
            View Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
