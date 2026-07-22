import React from 'react';
import { ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
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
        {/* Main Headline: Auth for Developers */}
        <h1 className="font-sans text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] max-w-3xl">
          Auth for<br />Developers
        </h1>

        {/* Subheading: One-Sentence Phrase about Auth for Developers */}
        <p className="text-zinc-400 text-base sm:text-lg lg:text-xl font-normal max-w-2xl text-center leading-relaxed">
          Empowering developers with production-ready, secure, and seamless JWT authentication boilerplate built for modern web applications.
        </p>

        {/* Action Buttons using customizable Button component with SVG Icons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <Button
            variant="primary"
            to="/register"
            icon={<ShieldCheck className="w-4 h-4 text-black" />}
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
