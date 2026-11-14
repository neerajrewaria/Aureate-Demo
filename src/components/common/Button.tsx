/*
  Button — Reusable Button Component
  =====================================
  Supports three visual variants:
  - primary: solid forest green background (main CTAs)
  - secondary: gold border with transparent background
  - ghost: no border, text only with hover underline

  Also supports a full-width mode and an as-link mode (renders an <a> tag).

  Keeps styling consistent across all pages without duplicating classes.
*/

import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

// Base props shared between button and anchor versions
interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

// When rendering as a regular <button>
interface AsButtonProps extends BaseButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  href?: never;
}

// When rendering as an <a> tag (for external links)
interface AsAnchorProps extends BaseButtonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  href: string;
}

type ButtonProps = AsButtonProps | AsAnchorProps;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-forest text-ivory hover:bg-forest-dark border border-forest hover:border-forest-dark',
  secondary: 'bg-transparent text-forest border border-gold hover:bg-gold/10',
  ghost: 'bg-transparent text-forest hover:text-sage border border-transparent underline-offset-4 hover:underline',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  href,
  className = '',
  ...rest
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium tracking-wide rounded-md transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-gold';
  const variantClasses = VARIANT_CLASSES[variant];
  const sizeClasses = SIZE_CLASSES[size];
  const widthClass = fullWidth ? 'w-full' : '';

  const allClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${className}`.trim();

  if (href !== undefined) {
    return (
      <a href={href} className={allClasses} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={allClasses} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
