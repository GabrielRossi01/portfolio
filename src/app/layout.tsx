import './globals.css';
import { ReactNode } from 'react';
import Script from 'next/script';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import type { Metadata } from 'next'; // 1. Importar o tipo

export const metadata: Metadata = {
  title: "Gabriel Rossi - Developer & Problem Solver",
  description: "Portfólio de Gabriel Rossi, desenvolvedor focado em resolver problemas complexos.",
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