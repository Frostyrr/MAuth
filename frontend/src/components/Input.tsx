import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  icon,
  error,
  id,
  type = 'text',
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === 'password';

  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const actualType = isPasswordType ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-1.5 w-full relative hardware-sharp group font-sans">
      {/* Field Label */}
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={inputId}
            className="font-sans text-xs uppercase tracking-wider text-zinc-400 font-semibold select-none"
          >
            {label}
          </label>
          {error && <span className="text-red-400 font-sans text-xs">{error}</span>}
        </div>
      )}

      {/* Input Field Container */}
      <div className="relative flex items-center w-full">
        {/* Animated Focus SVG Outline */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none rounded-xl overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="99.5%"
            height="99%"
            rx="12"
            fill="none"
            stroke={isFocused ? '#ffffff' : '#27272a'}
            strokeWidth={isFocused ? '1.8' : '1'}
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset={isFocused ? '0' : '100'}
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Left Field Icon */}
        {icon && (
          <div className="absolute left-3.5 text-zinc-500 group-focus-within:text-white transition-colors pointer-events-none z-10 shrink-0">
            {icon}
          </div>
        )}

        {/* HTML Input Element */}
        <input
          id={inputId}
          type={actualType}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={`bg-zinc-900/40 border border-zinc-800/80 text-white rounded-xl ${
            icon ? 'pl-10' : 'px-4'
          } ${isPasswordType ? 'pr-10' : 'pr-4'} py-3 text-sm focus:border-transparent focus:outline-none transition-all w-full placeholder:text-zinc-600 hardware-sharp font-sans ${className}`}
          {...props}
        />

        {/* Right Password Visibility Toggle Icon */}
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 text-zinc-500 hover:text-white transition-colors cursor-pointer p-1 z-10 focus:outline-none"
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
