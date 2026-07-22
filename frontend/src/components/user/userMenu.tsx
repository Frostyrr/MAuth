import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { User, LogOut, ShieldCheck, ChevronDown, LayoutDashboard } from 'lucide-react';
import { logout } from '../../lib/api';
import queryClient from '../../config/queryClient';
import useAuth from '../../hooks/useAuth';

export const UserMenu: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { mutate: signOut, isPending } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      navigate('/', { replace: true });
    },
  });

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userEmail = user?.email || 'user@mauth4devs.com';
  const initial = userEmail.charAt(0).toUpperCase();

  return (
    <div className="relative inline-block text-left font-sans" ref={menuRef}>
      {/* User Menu Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 text-white transition-all hover:bg-zinc-800/80 hardware-sharp group cursor-pointer"
      >
        <div className="w-7 h-7 rounded-lg bg-zinc-100 text-black flex items-center justify-center font-bold text-xs shadow-md">
          {initial}
        </div>
        <span className="text-xs font-medium text-zinc-300 group-hover:text-white max-w-[120px] sm:max-w-[160px] truncate">
          {userEmail}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-white' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-zinc-950/95 border border-zinc-800/90 shadow-2xl backdrop-blur-2xl p-2 z-50 hardware-sharp animate-in fade-in zoom-in-95 duration-150">
          {/* User Info Header */}
          <div className="px-3 py-2.5 mb-1 border-b border-zinc-900/90 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white truncate max-w-[180px]">
                {userEmail}
              </span>
              {user?.verified && (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              )}
            </div>
            <span className="text-[10px] font-sans font-medium text-zinc-400 uppercase tracking-wider">
              {user?.verified ? 'Verified Account' : 'Unverified Account'}
            </span>
          </div>

          {/* Navigation Actions */}
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                navigate('/dashboard');
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/80 transition-colors text-left cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4 text-zinc-400" />
              <span>User Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                navigate('/');
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/80 transition-colors text-left cursor-pointer"
            >
              <User className="w-4 h-4 text-zinc-400" />
              <span>View Landing Page</span>
            </button>

            {/* Divider */}
            <div className="my-1 border-t border-zinc-900/90" />

            {/* Logout Action */}
            <button
              type="button"
              disabled={isPending}
              onClick={() => {
                setIsOpen(false);
                signOut();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors text-left cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>{isPending ? 'Signing Out...' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
