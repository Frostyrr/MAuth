import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Shield, UserPlus } from 'lucide-react';
import AuthCard from '../components/AuthCard';
import Input from '../components/Input';
import Button from '../components/Button';
import background from '../assets/bg.jpg';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    setError('');
    setIsLoading(true);

    // Simulate login authentication
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden select-none hardware-sharp font-sans">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 scale-105 pointer-events-none"
        style={{ backgroundImage: `url(${background})` }}
      />

      {/* Radial Vignette & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#000000_85%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-800/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Form Container */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        <AuthCard>
          {/* Card Header & Brand Logo */}
          <div className="flex flex-col items-center text-center mb-8">
            <Link to="/" className="w-10 h-10 rounded-2xl bg-zinc-100 text-black flex items-center justify-center font-bold text-lg mb-4 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-black stroke-[2.5]" />
            </Link>

            <h1 className="font-sans font-bold text-3xl text-white tracking-tight mb-1.5">
              Welcome Back
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm font-normal">
              Enter your credentials to access your developer portal.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="bg-red-950/50 border border-red-900/80 rounded-xl p-3 text-red-300 text-xs font-sans flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                <span>{error}</span>
              </div>
            )}

            {/* Email Address Field */}
            <Input
              label="Email Address"
              type="email"
              placeholder="developer@mauth4devs.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
              required
            />

            {/* Password Field with Show/Hide Toggle */}
            <div className="flex flex-col gap-1">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-4 h-4" />}
                required
              />
              <div className="flex justify-end mt-1">
                <Link
                  to="/password/forgot"
                  className="font-sans text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Submit High-Contrast Button */}
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              iconRight={<ArrowRight className="w-4 h-4 text-black" />}
              className="mt-2"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          {/* Footer Link: Sign Up */}
          <div className="mt-8 pt-6 border-t border-zinc-900 text-center flex flex-col items-center gap-2">
            <span className="text-xs text-zinc-400 font-sans">
              Don't have an account?
            </span>
            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-zinc-300 transition-colors py-1.5 px-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 font-sans"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </Link>
          </div>
        </AuthCard>
      </div>
    </div>
  );
};

export default Login;
