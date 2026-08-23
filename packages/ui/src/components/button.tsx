import * as React from 'react';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'soft';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';
export type ButtonTone = 'brand' | 'neutral' | 'success' | 'danger';

export type UIThemeVars = {
  '--ui-radius': string;
  '--ui-font-size-sm': string;
  '--ui-font-size-md': string;
  '--ui-font-size-lg': string;
  '--ui-brand': string;
  '--ui-neutral': string;
  '--ui-success': string;
  '--ui-danger': string;
  '--ui-on-solid': string;
};

export const defaultUIThemeVars: UIThemeVars = {
  '--ui-radius': '0.625rem',
  '--ui-font-size-sm': '0.8125rem',
  '--ui-font-size-md': '0.9375rem',
  '--ui-font-size-lg': '1rem',
  '--ui-brand': '221 83% 53%',
  '--ui-neutral': '215 16% 47%',
  '--ui-success': '160 84% 39%',
  '--ui-danger': '0 84% 60%',
  '--ui-on-solid': '0 0% 100%',
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  tone?: ButtonTone;
  themeVars?: Partial<UIThemeVars>;
};

const toneVarByName: Record<ButtonTone, string> = {
  brand: '--ui-brand',
  neutral: '--ui-neutral',
  success: '--ui-success',
  danger: '--ui-danger',
};

function hslVar(cssVarName: string): string {
  return `hsl(var(${cssVarName}))`;
}

function mergeStyles(...styles: Array<React.CSSProperties | undefined>): React.CSSProperties {
  return Object.assign({}, ...styles);
}

const baseStyle: React.CSSProperties = {
  border: '1px solid transparent',
  borderRadius: 'var(--ui-radius)',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  fontWeight: 600,
  lineHeight: 1,
  transition: 'all 160ms ease',
  userSelect: 'none',
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: {
    fontSize: 'var(--ui-font-size-sm)',
    height: '2rem',
    padding: '0 0.75rem',
  },
  md: {
    fontSize: 'var(--ui-font-size-md)',
    height: '2.5rem',
    padding: '0 1rem',
  },
  lg: {
    fontSize: 'var(--ui-font-size-lg)',
    height: '2.875rem',
    padding: '0 1.25rem',
  },
  icon: {
    fontSize: 'var(--ui-font-size-md)',
    height: '2.5rem',
    width: '2.5rem',
    padding: 0,
  },
};

function variantStyle(variant: ButtonVariant, toneVar: string): React.CSSProperties {
  const tone = hslVar(toneVar);

  if (variant === 'solid') {
    return {
      backgroundColor: tone,
      color: 'hsl(var(--ui-on-solid))',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.12)',
    };
  }

  if (variant === 'outline') {
    return {
      backgroundColor: 'transparent',
      color: tone,
      borderColor: tone,
    };
  }

  if (variant === 'ghost') {
    return {
      backgroundColor: 'transparent',
      color: tone,
      borderColor: 'transparent',
    };
  }

  return {
    backgroundColor: `color-mix(in srgb, ${tone} 12%, white)`,
    color: tone,
    borderColor: `color-mix(in srgb, ${tone} 30%, white)`,
  };
}

export function Button({
  variant = 'solid',
  size = 'md',
  tone = 'brand',
  themeVars,
  style,
  disabled,
  children,
  ...props
}: ButtonProps): React.JSX.Element {
  const toneVar = toneVarByName[tone];
  const vars = { ...defaultUIThemeVars, ...themeVars } as React.CSSProperties;

  const disabledStyle: React.CSSProperties | undefined = disabled
    ? {
        opacity: 0.55,
        cursor: 'not-allowed',
      }
    : undefined;

  return (
    <button
      type="button"
      data-ui="button"
      data-variant={variant}
      data-size={size}
      data-tone={tone}
      disabled={disabled}
      style={mergeStyles(
        vars,
        baseStyle,
        sizeStyles[size],
        variantStyle(variant, toneVar),
        disabledStyle,
        style,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
