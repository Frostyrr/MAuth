import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle, ChevronLeft } from 'lucide-react';
import AuthCard from '../components/AuthCard';
import Input from '../components/Input';
import Button from '../components/Button';
import background from '../assets/bg.jpg';
import { login } from '../lib/api';
import { useMutation } from '@tanstack/react-query';
import { formatErrorMessage } from '../utils/formatError';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { mutate: signIn, isPending, isError, error: mutationError } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate('/', {
        replace: true,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    setError('');
    signIn({ email, password });
  };

  const rawError = isError ? mutationError : error;
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
        {/* Top "< Home" Back Button matching design reference */}
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
              Welcome Back
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm font-normal">
              Enter your credentials to sign in
            </p>
          </div>

          {/* Premium Modern Error UI Banner */}
          {displayErrorMsg && (
            <div className="bg-red-950/40 border border-red-900/60 rounded-xl p-3.5 mb-6 text-red-200 text-xs font-sans flex items-start gap-3 shadow-lg backdrop-blur-md hardware-sharp">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-red-200">Authentication Error</span>
                <span className="text-red-300/90 leading-relaxed font-normal">
                  {displayErrorMsg}
                </span>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email Address Field */}
            <Input
              label="Email Address"
              type="email"
              placeholder="don.juan@gmail.com"
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
              isLoading={isPending}
              iconRight={<ArrowRight className="w-4 h-4 text-black" />}
              className="mt-2"
            >
              {isPending ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          {/* Footer Link: Sign Up */}
          <div className="mt-8 pt-6 border-t border-zinc-900 text-center flex flex-col items-center gap-2">
            <span className="text-xs text-zinc-400 font-sans">
              Don't have an account?
              <Link
                to="/register"
                className="text-xs text-white font-bold font-sans hover:text-zinc-200"> Sign Up
              </Link>
            </span>
          </div>
        </AuthCard>
      </div>
    </div>
  );
};

export default Login;
