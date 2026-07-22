import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle2, Shield } from 'lucide-react';
import AuthCard from '../components/AuthCard';
import Input from '../components/Input';
import Button from '../components/Button';
import background from '../assets/bg.jpg';

export const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your registered email address');
      return;
    }
    setError('');
    setIsLoading(true);

    // Simulate password reset email dispatch
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
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
              Forgot Password
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm font-normal">
              Enter your verified email address to receive password reset instructions.
            </p>
          </div>

          {isSent ? (
            <div className="flex flex-col items-center text-center gap-5 py-2">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-sans font-bold text-white text-lg">
                  Reset Link Sent
                </h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  We sent a recovery link to <span className="text-white font-medium">{email}</span>. Please check your inbox.
                </p>
              </div>

              <div className="w-full mt-2 flex flex-col gap-3">
                <Button variant="primary" to="/password/reset" className="w-full">
                  Simulate Password Reset Link
                </Button>
              </div>
            </div>
          ) : (
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

              {/* Submit High-Contrast Button */}
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                iconRight={<Send className="w-4 h-4 text-black" />}
                className="mt-2"
              >
                {isLoading ? 'Sending Link...' : 'Send Reset Link'}
              </Button>
            </form>
          )}

          {/* Footer Link: Back to Sign In */}
          <div className="mt-8 pt-6 border-t border-zinc-900 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-xs font-sans font-medium text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </AuthCard>
      </div>
    </div>
  );
};

export default ForgetPassword;
