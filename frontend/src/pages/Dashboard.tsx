import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ShieldCheck, Monitor, Trash2, Shield, Lock, Activity, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import UserMenu from '../components/user/userMenu';
import Button from '../components/ui/Button';
import background from '../assets/bg.jpg';
import useAuth from '../hooks/useAuth';
import { getSessions, deleteSession } from '../lib/api';
import queryClient from '../config/queryClient';
import { formatErrorMessage } from '../utils/formatError';

interface SessionItem {
  _id: string;
  userId?: string;
  userAgent?: string;
  createdAt?: string;
  isCurrent?: boolean;
}

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Fetch active sessions for the user
  const { data: sessionsData, isLoading: isSessionsLoading, error: sessionsError } = useQuery({
    queryKey: ['sessions'],
    queryFn: getSessions,
  });

  // Revoke session mutation
  const { mutate: revokeSession, isPending: isRevoking } = useMutation({
    mutationFn: deleteSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });

  const sessions: SessionItem[] = Array.isArray(sessionsData)
    ? (sessionsData as SessionItem[])
    : (sessionsData as any)?.data || [];

  const displaySessionsError = formatErrorMessage(sessionsError);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden select-none hardware-sharp font-sans">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 scale-105 pointer-events-none"
        style={{ backgroundImage: `url(${background})` }}
      />

      {/* Radial Blur & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#000000_85%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-zinc-800/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Dashboard Top Header Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-900/80 bg-black/80 backdrop-blur-xl font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-2">
            <Shield className="w-5 h-5 text-white" />
            <span className="font-sans font-bold text-xl tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400/90 bg-clip-text text-transparent">
              MAuth4Devs
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/about"
              className="hidden sm:inline-block text-xs font-medium text-zinc-400 hover:text-white transition-colors"
            >
              About Architecture
            </Link>
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Main Dashboard Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 relative z-10 flex flex-col gap-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-900/90 pb-8">
          <div className="flex flex-col gap-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-medium text-zinc-300 w-fit">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Active User Management Vault</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              User &amp; Session Management
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm font-normal">
              Monitor your active devices, inspect JWT token sessions, and manage security parameters.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              to="/"
              className="text-xs font-sans"
            >
              Landing Page
            </Button>
          </div>
        </div>

        {/* Overview Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Account Status */}
          <div className="bg-zinc-950/80 border border-zinc-900/90 backdrop-blur-xl rounded-2xl p-5 flex flex-col gap-3 hardware-sharp">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Account Status</span>
              {user?.verified ? (
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-white tracking-tight">
                {user?.verified ? 'Verified Account' : 'Pending Verification'}
              </span>
            </div>
            <span className="text-[11px] text-zinc-400">
              {user?.verified ? 'Full API & portal permissions' : 'Check inbox to verify email'}
            </span>
          </div>

          {/* Card 2: Active Devices */}
          <div className="bg-zinc-950/80 border border-zinc-900/90 backdrop-blur-xl rounded-2xl p-5 flex flex-col gap-3 hardware-sharp">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Active Devices</span>
              <Monitor className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white tracking-tight">
                {sessions.length || 1}
              </span>
              <span className="text-xs text-zinc-400">Authorized Sessions</span>
            </div>
            <span className="text-[11px] text-zinc-400">Tracked in MongoDB database</span>
          </div>

          {/* Card 3: Security Protocol */}
          <div className="bg-zinc-950/80 border border-zinc-900/90 backdrop-blur-xl rounded-2xl p-5 flex flex-col gap-3 hardware-sharp">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Security Architecture</span>
              <Lock className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-white tracking-tight">
                HTTP-Only Cookie
              </span>
            </div>
            <span className="text-[11px] text-zinc-400">JWT token refresh rotation active</span>
          </div>

          {/* Card 4: Mail Transport */}
          <div className="bg-zinc-950/80 border border-zinc-900/90 backdrop-blur-xl rounded-2xl p-5 flex flex-col gap-3 hardware-sharp">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Email Transport</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-white tracking-tight">
                Resend Mailer
              </span>
            </div>
            <span className="text-[11px] text-zinc-400">Transactional email engine</span>
          </div>
        </div>

        {/* User Details & Active Sessions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <div className="bg-zinc-950/80 border border-zinc-900/90 backdrop-blur-xl rounded-2xl p-6 flex flex-col gap-6 hardware-sharp h-fit">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold text-white tracking-tight">User Account Profile</h3>
              <p className="text-xs text-zinc-400 font-normal">Registered user credentials and status.</p>
            </div>

            <div className="flex flex-col gap-4 text-xs font-sans">
              <div className="flex flex-col gap-1 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                <span className="text-zinc-400 text-[10px] uppercase font-semibold">Email Address</span>
                <span className="font-mono text-white font-medium select-all">{user?.email || 'N/A'}</span>
              </div>

              <div className="flex flex-col gap-1 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                <span className="text-zinc-400 text-[10px] uppercase font-semibold">User ID</span>
                <span className="font-mono text-zinc-300 text-[11px] select-all">{user?._id || 'N/A'}</span>
              </div>

              <div className="flex flex-col gap-1 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                <span className="text-zinc-400 text-[10px] uppercase font-semibold">Account Creation Date</span>
                <span className="font-sans text-zinc-300">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recently Registered'}
                </span>
              </div>
            </div>

            {!user?.verified && (
              <div className="mt-2">
                <Button
                  variant="primary"
                  to="/verify-email"
                  state={{ email: user?.email }}
                  className="w-full text-xs font-sans"
                >
                  Verify Email Address
                </Button>
              </div>
            )}
          </div>

          {/* Active Sessions Management Table */}
          <div className="lg:col-span-2 bg-zinc-950/80 border border-zinc-900/90 backdrop-blur-xl rounded-2xl p-6 flex flex-col gap-6 hardware-sharp">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-zinc-900/90 pb-4">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-white tracking-tight">Active Device Sessions</h3>
                <p className="text-xs text-zinc-400 font-normal">Devices currently logged into this account.</p>
              </div>
            </div>

            {displaySessionsError && (
              <div className="bg-red-950/40 border border-red-900/60 rounded-xl p-3 text-red-200 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{displaySessionsError}</span>
              </div>
            )}

            {isSessionsLoading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-white" />
                <span className="text-xs text-zinc-400">Loading active sessions...</span>
              </div>
            ) : sessions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-2 text-zinc-400">
                <Monitor className="w-8 h-8 text-zinc-600 mb-1" />
                <span className="text-sm text-zinc-300 font-medium">No active secondary sessions</span>
                <span className="text-xs text-zinc-500">Your current session is active and secure.</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-900 text-zinc-400 uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-3">Device / User Agent</th>
                      <th className="py-3 px-3">Created</th>
                      <th className="py-3 px-3">Session Status</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900/80">
                    {sessions.map((sess) => (
                      <tr key={sess._id} className="hover:bg-zinc-900/40 transition-colors">
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-2.5">
                            <Monitor className="w-4 h-4 text-zinc-400 shrink-0" />
                            <span className="font-mono text-zinc-200 text-[11px] truncate max-w-[200px] sm:max-w-[260px]">
                              {sess.userAgent || 'Web Browser'}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-zinc-400">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-zinc-500" />
                            <span>
                              {sess.createdAt
                                ? new Date(sess.createdAt).toLocaleDateString()
                                : 'Active'}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-3">
                          {sess.isCurrent ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-900/80 text-[10px] font-semibold text-emerald-400">
                              <CheckCircle2 className="w-3 h-3" /> Current Device
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-medium text-zinc-300">
                              Active Session
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <button
                            type="button"
                            disabled={isRevoking || sess.isCurrent}
                            onClick={() => revokeSession(sess._id)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-red-950/40 border border-zinc-800 hover:border-red-900/60 text-zinc-400 hover:text-red-300 text-[11px] font-medium transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Revoke</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
