import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import {
  ThemedButton,
  ThemedCard,
  ThemedText,
  ThemedInput,
  ThemeSwitcher,
} from './components/ThemedComponents';

function DemoContent() {
  const { theme } = useTheme();

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background,
        padding: theme.spacing.xl,
        fontFamily: theme.typography.fontFamily,
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.lg,
        }}
      >
        <ThemeSwitcher />

        <ThemedCard elevated>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <ThemedText variant="title">
              React Theme System
            </ThemedText>

            <ThemedText variant="subtitle">
              Lab 13.1 — Higher Order Component
            </ThemedText>

            <ThemedText variant="body">
              Этот блок автоматически меняет цвета в зависимости от темы.
            </ThemedText>

            <ThemedText variant="caption">
              HOC withTheme передаёт theme, isDark и toggleTheme.
            </ThemedText>
          </div>
        </ThemedCard>

        <ThemedCard>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <ThemedInput
              label="Your name"
              placeholder="Enter your name"
            />

            <ThemedInput
              label="Email"
              placeholder="Enter your email"
              error="This field is required"
            />
          </div>
        </ThemedCard>

        <ThemedCard>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <ThemedButton variant="primary">Primary</ThemedButton>
            <ThemedButton variant="secondary">Secondary</ThemedButton>
            <ThemedButton variant="outline">Outline</ThemedButton>
            <ThemedButton variant="ghost">Ghost</ThemedButton>
          </div>
        </ThemedCard>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <DemoContent />
    </ThemeProvider>
  );
}