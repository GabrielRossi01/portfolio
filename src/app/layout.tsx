import './globals.css';
import { ReactNode } from 'react';
import { Instrument_Serif, Sora } from 'next/font/google';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import SmoothScroll from '@/components/SmoothScroll';
import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Gabriel Rossi - Developer & Problem Solver",
  description: "Gabriel Rossi Portfolio, developer focused on solving complex problems.",
  applicationName: "Portfolio",
  appleWebApp: {
    capable: true,
    title: "Portfolio",
    statusBarStyle: "black-translucent",
  },
  manifest: "/site.webmanifest",
  // ícones gerados a partir do mesmo logo vetorial (public/favicon.svg)
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  other: {
    // bloco do Windows ao fixar o site no menu Iniciar
    'msapplication-TileColor': '#0a0a0a',
    'msapplication-TileImage': '/web-app-manifest-192x192.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  // cor da barra do navegador no Android e no Safari, seguindo o tema do sistema
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <SmoothScroll />
            {children}
            <Analytics />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
