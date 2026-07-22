import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, ArrowRight, RefreshCw, CheckCircle2, AlertCircle, ArrowLeft, ChevronLeft } from 'lucide-react';
import AuthCard from '../components/AuthCard';
import Button from '../components/Button';
import background from '../assets/bg.jpg';
import { resendVerificationEmail } from '../lib/api';
import { useMutation } from '@tanstack/react-query';
import { formatErrorMessage } from '../utils/formatError';

export const VerifyEmailPrompt: React.FC = () => {
  const location = useLocation();
  const userEmail = (location.state as { email?: string })?.email;
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const { mutate: triggerResend, isPending, error } = useMutation({
    mutationFn: resendVerificationEmail,
    onSuccess: () => {
      setResendStatus('A new verification email has been sent to your inbox.');
      setCooldown(60); // 60s resend cooldown
    },
    onError: () => {
      setResendStatus(null);
    },
  });

  const handleResend = () => {
    if (!userEmail || cooldown > 0) return;
    setResendStatus(null);
    triggerResend(userEmail);
  };

  const displayError = formatErrorMessage(error);

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

      {/* Main Container */}
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
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-200 shadow-xl mb-4">
              <Mail className="w-7 h-7 text-zinc-300" />
            </div>

            <h1 className="font-sans font-bold text-2xl sm:text-3xl text-white tracking-tight mb-2">
              Check Your Email
            </h1>
            <p className="text-zinc-300 text-xs sm:text-sm font-normal leading-relaxed max-w-sm">
              We've sent a verification link to your email address. Please check your inbox to activate your account.
            </p>

            {/* Display User's Email Address if Available */}
            {userEmail && (
              <div className="mt-3 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-white tracking-tight select-all">
                {userEmail}
              </div>
            )}
          </div>

          {/* Resend Success Toast / Feedback Banner */}
          {resendStatus && (
            <div className="bg-emerald-950/40 border border-emerald-900/60 rounded-xl p-3 mb-5 text-emerald-300 text-xs font-sans flex items-center gap-2.5 shadow-lg backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{resendStatus}</span>
            </div>
          )}

          {/* Error Banner */}
          {displayError && (
            <div className="bg-red-950/40 border border-red-900/60 rounded-xl p-3 mb-5 text-red-200 text-xs font-sans flex items-start gap-2.5 shadow-lg backdrop-blur-md">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-red-200">Resend Error</span>
                <span className="text-red-300/90">{displayError}</span>
              </div>
            </div>
          )}

          {/* Main Action Buttons */}
          <div className="flex flex-col gap-3 mt-2">
            {/* Resend Email Button */}
            <Button
              type="button"
              variant="primary"
              onClick={handleResend}
              isLoading={isPending}
              disabled={!userEmail || cooldown > 0}
              icon={isPending ? <RefreshCw className="w-4 h-4 animate-spin text-black" /> : <Mail className="w-4 h-4 text-black" />}
              iconRight={cooldown === 0 ? <ArrowRight className="w-4 h-4 text-black" /> : undefined}
              className="w-full"
            >
              {cooldown > 0
                ? `Resend Email (${cooldown}s)`
                : isPending
                ? 'Resending Email...'
                : 'Resend Verification Email'}
            </Button>

            {/* Use Different Email Option */}
            <Button
              variant="secondary"
              to="/register"
              icon={<ArrowLeft className="w-4 h-4 text-zinc-400" />}
              className="w-full text-xs font-sans"
            >
              Use Different Email
            </Button>
          </div>

          {/* Footer Back to Login Link */}
          <div className="mt-8 pt-6 border-t border-zinc-900 text-center">
            <Link
              to="/login"
              className="text-xs font-sans font-medium text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <span>Back to Login</span>
            </Link>
          </div>
        </AuthCard>
      </div>
    </div>
  );
};

export default VerifyEmailPrompt;
