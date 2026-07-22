import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, AlertCircle, ArrowRight, RefreshCw, ChevronLeft } from 'lucide-react';
import AuthCard from '../components/ui/AuthCard';
import Button from '../components/ui/Button';
import background from '../assets/bg.jpg';
import { verifyEmail } from '../lib/api';
import { useQuery } from '@tanstack/react-query';
import { formatErrorMessage } from '../utils/formatError';

export const VerifyEmail: React.FC = () => {
  const { code } = useParams<{ code?: string }>();

  // Execute email verification query automatically when code is present in URL
  const { isPending, isSuccess, isError, error, refetch } = useQuery({
    queryKey: ['emailVerification', code],
    queryFn: () => verifyEmail(code || ''),
    enabled: !!code,
    retry: false,
  });

  const handleRetry = () => {
    if (code) {
      refetch();
    }
  };

  const displayErrorMsg = formatErrorMessage(error);

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
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="font-sans font-bold text-3xl text-white tracking-tight mb-1.5">
              Email Verification
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm font-normal">
              Authenticating verification link with security vault.
            </p>
          </div>

          {/* 1. Loading / Verifying State */}
          {isPending && code && (
            <div className="flex flex-col items-center text-center gap-5 py-6">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white shadow-lg">
                <RefreshCw className="w-6 h-6 animate-spin text-zinc-300" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-white text-lg tracking-tight">
                  Verifying Email Address...
                </h3>
                <p className="text-xs text-zinc-400 font-sans">
                  Please wait while we activate your account.
                </p>
              </div>
            </div>
          )}

          {/* 2. Success Verification State */}
          {isSuccess && (
            <div className="flex flex-col items-center text-center gap-5 py-4">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="flex flex-col gap-1.5">
                <h3 className="font-bold text-white text-xl sm:text-2xl tracking-tight">
                  Registration Complete
                </h3>
                <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                  Your account has been verified. You can now sign in.
                </p>
              </div>

              <div className="w-full mt-3">
                <Button
                  variant="primary"
                  to="/login"
                  iconRight={<ArrowRight className="w-4 h-4 text-black" />}
                  className="w-full"
                >
                  Proceed to Sign In
                </Button>
              </div>
            </div>
          )}

          {/* 3. Error Verification State */}
          {isError && (
            <div className="flex flex-col items-center text-center gap-6 py-2">
              <div className="bg-red-950/40 border border-red-900/60 rounded-xl p-4 text-red-200 text-xs font-sans flex items-start gap-3 shadow-lg backdrop-blur-md w-full text-left">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-red-200">Verification Failed</span>
                  <span className="text-red-300/90 leading-relaxed font-normal">
                    {displayErrorMsg || 'The verification link is invalid or has expired.'}
                  </span>
                </div>
              </div>

              <div className="w-full flex flex-col gap-3">
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleRetry}
                  isLoading={isPending}
                  icon={<CheckCircle2 className="w-4 h-4 text-black" />}
                  iconRight={<ArrowRight className="w-4 h-4 text-black" />}
                  className="w-full"
                >
                  Retry Verification
                </Button>

                <Button
                  variant="secondary"
                  to="/email/verify"
                  className="w-full text-xs font-sans"
                >
                  Resend Email Instructions
                </Button>
              </div>
            </div>
          )}

          {/* Footer Back Link */}
          <div className="mt-8 pt-6 border-t border-zinc-900 text-center">
            <Link
              to="/login"
              className="text-xs font-sans font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </AuthCard>
      </div>
    </div>
  );
};

export default VerifyEmail;
