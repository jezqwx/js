import React from 'react';
import withTheme from '../hocs/withTheme';

// ThemedButton
function BaseButton({ theme, children, variant = 'primary', ...props }) {
  const baseStyles = {
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    borderRadius: theme.borderRadius.md,
    border: 'none',
    cursor: 'pointer',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize.md,
    fontWeight: 500,
    transition: 'all 0.2s ease',
  };

  const variantStyles = {
    primary: {
      backgroundColor: theme.colors.primary,
      color: '#ffffff',
    },
    secondary: {
      backgroundColor: theme.colors.secondary,
      color: '#ffffff',
    },
    outline: {
      backgroundColor: 'transparent',
      color: theme.colors.primary,
      border: `2px solid ${theme.colors.primary}`,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: theme.colors.text,
    },
  };

  return (
    <button style={{ ...baseStyles, ...variantStyles[variant] }} {...props}>
      {children}
    </button>
  );
}

export const ThemedButton = withTheme(BaseButton);

// ThemedCard
function BaseCard({ theme, children, elevated = false, ...props }) {
  const cardStyle = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    border: `1px solid ${theme.colors.border}`,
    fontFamily: theme.typography.fontFamily,
  };

  if (elevated) {
    cardStyle.boxShadow =
      theme.name === 'dark'
        ? '0 4px 12px rgba(0, 0, 0, 0.4)'
        : '0 4px 12px rgba(0, 0, 0, 0.1)';
  }

  return (
    <div style={cardStyle} {...props}>
      {children}
    </div>
  );
}

export const ThemedCard = withTheme(BaseCard);

// ThemedText
function BaseText({ theme, children, variant = 'body', ...props }) {
  const textStyles = {
    title: {
      fontSize: theme.typography.fontSize.xxl,
      fontWeight: 700,
      color: theme.colors.text,
    },
    subtitle: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: 600,
      color: theme.colors.text,
    },
    body: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text,
    },
    caption: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.textSecondary,
    },
  };

  return (
    <span style={textStyles[variant]} {...props}>
      {children}
    </span>
  );
}

export const ThemedText = withTheme(BaseText);

// ThemedInput
function BaseInput({ theme, label, error, ...props }) {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
  };

  const inputStyle = {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${error ? theme.colors.error : theme.colors.border}`,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize.md,
  };

  return (
    <div style={containerStyle}>
      {label && (
        <label
          style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text,
            fontWeight: 500,
          }}
        >
          {label}
        </label>
      )}

      <input style={inputStyle} {...props} />

      {error && (
        <span
          style={{
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.error,
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

export const ThemedInput = withTheme(BaseInput);

// ThemeSwitcher
function BaseThemeSwitcher({ theme, isDark, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        border: `1px solid ${theme.colors.border}`,
        backgroundColor: theme.colors.surface,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.xs,
      }}
    >
      <span style={{ fontSize: '18px' }}>
        {isDark ? '☀' : '☽'}
      </span>

      <span
        style={{
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.text,
        }}
      >
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
}

export const ThemeSwitcher = withTheme(BaseThemeSwitcher);