import './globals.css';
import { ReactNode } from 'react';
import { Instrument_Serif, Sora } from 'next/font/google';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import SmoothScroll from '@/components/SmoothScroll';
import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';

// Fontes servidas pelo próprio site: sem a folha do Google bloqueando a pintura.
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

const description =
  'Portfólio de Gabriel Rossi, desenvolvedor full stack com foco em front-end: interfaces em React, Next.js e Angular sobre APIs em Java e Spring Boot.';

export const metadata: Metadata = {
  title: 'Gabriel Rossi · Desenvolvedor Full Stack (Front-end)',
  description,
  applicationName: "Portfolio",
  openGraph: {
    title: 'Gabriel Rossi · Desenvolvedor Full Stack (Front-end)',
    description,
    type: 'website',
    locale: 'pt_BR',
  },
  appleWebApp: {
    capable: true,
    title: "Portfolio",
    statusBarStyle: "default",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: [
      { url: '/favicon.ico' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

// Aplica o tema salvo antes da primeira pintura (sem piscar o escuro para quem usa o claro).
const themeScript = `try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t='dark';var c=document.documentElement.classList;c.remove('light','dark');c.add(t)}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`dark ${sora.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
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
