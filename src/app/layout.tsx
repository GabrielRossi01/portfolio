import './globals.css';
import { ReactNode } from 'react';
import Script from 'next/script';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Gabriel Rossi - Developer & Problem Solver",
  description: "Gabriel Rossi Portfolio, developer focused on solving complex problems.",
  icons: {
    icon: [
      { url: '/favicon.svg', sizes: 'image/svg+xml' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <Script
              id="orchids-browser-logs"
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
              strategy="afterInteractive"
              data-orchids-project-id="02d6cf9d-ad82-43f3-af7b-7bdd238cfacd"
            />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
