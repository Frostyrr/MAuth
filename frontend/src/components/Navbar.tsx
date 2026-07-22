import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from './Button';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-900/80 bg-black/80 backdrop-blur-xl transition-all hardware-sharp font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Branding: MAuth4Devs with Top-to-Bottom Silver Gradient */}
        <Link to="/" className="group">
          <span className="font-sans font-bold text-xl tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400/90 bg-clip-text text-transparent">
            MAuth4Devs
          </span>
        </Link>

        {/* Center Navigation Links (Clean text without icons) */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-sm text-zinc-400">
          <Link
            to="/about"
            className="hover:text-white transition-colors"
          >
            About
          </Link>

          <a
            href="https://marcrebato.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            View Portfolio
          </a>

          <a
            href="mailto:marcelson.rebato@gmail.com"
            className="hover:text-white transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Right Navigation Actions */}
        <div className="flex items-center gap-3 font-sans">
          <Link
            to="/login"
            className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/60 transition-all"
          >
            Login
          </Link>

          <Button
            variant="primary"
            to="/register"
            iconRight={<ArrowRight className="w-4 h-4 text-black" />}
            className="px-4 py-2 text-xs font-semibold"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
