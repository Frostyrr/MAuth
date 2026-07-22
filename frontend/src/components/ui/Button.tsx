import React from 'react';
import { Link } from 'react-router-dom';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Optional React Router destination path */
  to?: string;
  /** Optional location state for React Router Link */
  state?: any;
  /** Optional external website URL */
  href?: string;
  /** Button visual style variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Optional icon to display on the left side */
  icon?: React.ReactNode;
  /** Optional icon to display on the right side */
  iconRight?: React.ReactNode;
  /** Optional loading state displaying a spinner */
  isLoading?: boolean;
  /** Button type for forms */
  type?: 'button' | 'submit' | 'reset';
  /** Optional custom CSS classes */
  className?: string;
  /** Target attribute for external link (e.g. '_blank') */
  target?: string;
  /** Rel attribute for external link */
  rel?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  to,
  state,
  href,
  variant = 'primary',
  icon,
  iconRight,
  isLoading = false,
  type = 'button',
  className = '',
  disabled,
  children,
  target,
  rel,
  ...props
}) => {
  const isButtonDisabled = disabled || isLoading;

  // Base button styles following ABC Favorit typography & minimal design principles
  const baseStyles =
    'inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium font-favorit transition-all duration-200 cursor-pointer select-none active:scale-[0.98] hardware-sharp focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none group';

  // Variants according to modern aesthetic guidelines
  const variantStyles = {
    primary:
      'bg-zinc-200 text-black hover:bg-white font-semibold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)]',
    secondary:
      'bg-zinc-900/80 text-white hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-xl shadow-sm',
    outline:
      'bg-transparent text-white border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900/50 rounded-xl',
    ghost:
      'bg-transparent text-zinc-300 hover:text-white hover:bg-zinc-900/40 rounded-xl',
  }[variant];

  const combinedClasses = `${baseStyles} ${variantStyles} ${className}`;

  const content = (
    <>
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4 text-current shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        icon && <span className="inline-flex items-center shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!isLoading && iconRight && (
        <span className="inline-flex items-center shrink-0 transition-transform group-hover:translate-x-0.5">
          {iconRight}
        </span>
      )}
    </>
  );

  // 1. If 'to' prop is provided, render React Router Link (Internal Routing)
  if (to) {
    return (
      <Link to={to} state={state} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  // 2. If 'href' prop is provided, render external HTML Anchor (Website Link)
  if (href) {
    return (
      <a
        href={href}
        target={target || (href.startsWith('http') ? '_blank' : undefined)}
        rel={rel || (href.startsWith('http') ? 'noopener noreferrer' : undefined)}
        className={combinedClasses}
      >
        {content}
      </a>
    );
  }

  // 3. Fallback: Standard HTML Button
  return (
    <button
      type={type}
      disabled={isButtonDisabled}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
