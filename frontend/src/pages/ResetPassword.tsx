import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';
import AuthCard from '../components/AuthCard';
import Input from '../components/Input';
import Button from '../components/Button';
import background from '../assets/bg.jpg';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setError('Please fill in both password fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setIsLoading(true);

    // Simulate password update
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 1800);
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
              Reset Password
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm font-normal">
              Enter your new password below to update your account credentials.
            </p>
          </div>

          {isSuccess ? (
            <div className="flex flex-col items-center text-center gap-4 py-4">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-sans font-bold text-white text-lg">
                  Password Updated
                </h3>
                <p className="text-xs text-zinc-400 font-sans">
                  Redirecting to Sign In portal...
                </p>
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

              {/* New Password Field */}
              <Input
                label="New Password"
                type="password"
                placeholder="••••••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                icon={<Lock className="w-4 h-4" />}
                required
              />

              {/* Confirm New Password Field */}
              <Input
                label="Confirm New Password"
                type="password"
                placeholder="••••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={<Lock className="w-4 h-4" />}
                required
              />

              {/* Submit High-Contrast Button */}
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                iconRight={<ArrowRight className="w-4 h-4 text-black" />}
                className="mt-2"
              >
                {isLoading ? 'Resetting Password...' : 'Reset Password'}
              </Button>
            </form>
          )}

          {/* Footer Link: Back to Sign In */}
          <div className="mt-8 pt-6 border-t border-zinc-900 text-center">
            <Link
              to="/login"
              className="text-xs font-sans font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Return to Sign In
            </Link>
          </div>
        </AuthCard>
      </div>
    </div>
  );
};

export default ResetPassword;
