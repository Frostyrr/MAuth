import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle2, AlertCircle, ChevronLeft } from 'lucide-react';
import AuthCard from '../components/AuthCard';
import Input from '../components/Input';
import Button from '../components/Button';
import background from '../assets/bg.jpg';
import { sendPasswordResetEmail } from '../lib/api';
import { useMutation } from '@tanstack/react-query';
import { formatErrorMessage } from '../utils/formatError';

export const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const { mutate: requestReset, isPending, isSuccess, error: mutationError } = useMutation({
    mutationFn: sendPasswordResetEmail,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your registered email address');
      return;
    }
    setError('');
    requestReset(email);
  };

  const rawError = mutationError || error;
  const displayErrorMsg = formatErrorMessage(rawError);

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
        {/* Top "< Home" Back Button */}
        <div className="flex items-center justify-start mb-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold font-sans text-zinc-400 hover:text-white transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:-translate-x-0.5 transition-transform" />
            <span>Home</span>
          </Link>
        </div>

        <AuthCard>
          {/* Card Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="font-sans font-bold text-3xl text-white tracking-tight mb-1.5">
              Forgot Password
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm font-normal">
              Enter your registered email address to receive password recovery instructions.
            </p>
          </div>

          {/* Premium Modern Error UI Banner */}
          {displayErrorMsg && (
            <div className="bg-red-950/40 border border-red-900/60 rounded-xl p-3.5 mb-6 text-red-200 text-xs font-sans flex items-start gap-3 shadow-lg backdrop-blur-md hardware-sharp">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-red-200">Reset Request Failed</span>
                <span className="text-red-300/90 leading-relaxed font-normal">
                  {displayErrorMsg}
                </span>
              </div>
            </div>
          )}

          {isSuccess ? (
            <div className="flex flex-col items-center text-center gap-5 py-2">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-sans font-bold text-white text-xl tracking-tight">
                  Recovery Email Sent
                </h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  We sent a password reset link to <span className="text-white font-mono font-medium">{email}</span>. Please check your inbox.
                </p>
              </div>

              <div className="w-full mt-2 flex flex-col gap-3">
                <Button
                  variant="primary"
                  to="/login"
                  iconRight={<ArrowLeft className="w-4 h-4 text-black" />}
                  className="w-full"
                >
                  Return to Sign In
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                isLoading={isPending}
                iconRight={<Send className="w-4 h-4 text-black" />}
                className="mt-2"
              >
                {isPending ? 'Sending Link...' : 'Send Reset Link'}
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
