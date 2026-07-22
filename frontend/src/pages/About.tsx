import React from 'react';
import { ArrowRight, Lock, Key, Cpu, Zap, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Navbar from '../components/ui/Navbar';
import background from '../assets/bg.jpg';

export const About: React.FC = () => {
  const features = [
    {
      icon: <Lock className="w-5 h-5 text-white" />,
      title: 'JWT Authentication',
      description: 'Cryptographically signed JSON Web Tokens with automated HTTP-only cookie storage and refresh token rotation.',
    },
    {
      icon: <Key className="w-5 h-5 text-white" />,
      title: 'Developer First APIs',
      description: 'Clean REST & GraphQL API contracts designed for high throughput, seamless integration, and strict security controls.',
    },
    {
      icon: <Cpu className="w-5 h-5 text-white" />,
      title: 'Vite & React 19 Core',
      description: 'Powered by the latest React 19 compiler and Vite lightning-fast HMR bundler for instant development cycles.',
    },
    {
      icon: <Zap className="w-5 h-5 text-white" />,
      title: 'Sub-12ms Response Time',
      description: 'Optimized state evaluation and minimal bundle footprint guaranteeing ultra-low latency authentication flows.',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden select-none hardware-sharp font-sans">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 scale-105 pointer-events-none"
        style={{ backgroundImage: `url(${background})` }}
      />

      {/* Radial Blur & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#000000_85%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-800/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Shared Unified Header Navigation */}
      <Navbar />

      {/* Main About Content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 flex flex-col gap-16 text-center">
        {/* Title & Tagline */}
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-medium text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Developer-First Authentication Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-tight">
            About MAuth4Devs
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            MAuth4Devs is a high-performance, pitch-black monochrome React &amp; Express authentication boilerplate engineered for developers who demand security, simplicity, and visual elegance.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-zinc-950/70 border border-zinc-900/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8 flex flex-col gap-3 hover:border-zinc-700/80 transition-all hardware-sharp"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-1">
                {feat.icon}
              </div>
              <h3 className="font-bold text-white text-lg tracking-tight">
                {feat.title}
              </h3>
              <p className="text-zinc-400 text-sm font-normal leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Action Banner */}
        <div className="bg-zinc-950/80 border border-zinc-900/90 rounded-3xl p-8 sm:p-12 flex flex-col items-center gap-6 backdrop-blur-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Ready to integrate MAuth4Devs?
          </h2>
          <p className="text-zinc-400 text-sm max-w-md font-normal">
            Start building your application today with pre-configured JWT authentication, routes, and dark mode design.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" to="/register" iconRight={<ArrowRight className="w-4 h-4 text-black" />}>
              Get Started Now
            </Button>
            <Button variant="secondary" to="/">
              Return to Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
