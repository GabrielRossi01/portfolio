"use client";

import { useMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function ScrollingBanner() {
    const isMobile = useMobile();
    const { theme } = useTheme();
    const { language } = useLanguage();

    const keywordsByLanguage = {
        'pt-BR': [
            'DINÂMICO',
            'ESCALÁVEL',
            'INTERATIVO',
            'SEGURO',
            'CONFIÁVEL',
            'ENVOLVENTE',
            'ACESSÍVEL',
        ],
        'en': [
            'DYNAMIC',
            'SCALABLE',
            'INTERACTIVE',
            'SECURE',
            'RELIABLE',
            'ENGAGING',
            'ACCESSIBLE',
        ],
        'es': [
            'DINÁMICO',
            'ESCALABLE',
            'INTERACTIVO',
            'SEGURO',
            'CONFIABLE',
            'ATRACTIVO',
            'ACCESIBLE',
        ],
    };

    const keywords = keywordsByLanguage[language];
    const duplicatedKeywords = [...keywords, ...keywords, ...keywords];
    const duration = isMobile ? 5 : 15;

    return (
        <div className="relative w-full overflow-hidden py-8 sm:py-10 md:py-12">
            <div
                className="relative overflow-hidden"
                style={{
                    transform: 'rotate(-3deg) translateY(-10px)',
                }}
            >
                <div className="glass-liquid py-2 sm:py-2.5 md:py-3">
                    <motion.div
                        key={`banner-1-${isMobile}`}
                        className="flex gap-6 sm:gap-8 md:gap-10 whitespace-nowrap"
                        style={{
                            animation: `scroll-x ${duration}s linear infinite`,
                        }}
                    >
                        {duplicatedKeywords.map((keyword, index) => (
                            <div key={index} className="flex items-center gap-3 sm:gap-4 md:gap-5">
                                <span
                                    className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider text-gray-900 dark:text-white"
                                    style={{
                                        fontFamily: "'Instrument Serif', serif",
                                    }}
                                >
                                    {keyword}
                                </span>
                                <span
                                    className="text-base sm:text-lg text-gray-900 dark:text-white"
                                    style={{
                                        fontFamily: "'Instrument Serif', serif",
                                    }}
                                >
                                    +
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <div
                className="relative overflow-hidden mt-4 sm:mt-5 md:mt-6"
                style={{
                    transform: 'rotate(-3deg) translateY(10px)',
                }}
            >
                <div className="glass-liquid py-2 sm:py-2.5 md:py-3">
                    <motion.div
                        key={`banner-2-${isMobile}`}
                        className="flex gap-6 sm:gap-8 md:gap-10 whitespace-nowrap"
                        style={{
                            animation: `scroll-x ${duration}s linear infinite`,
                            animationDirection: 'reverse',
                        }}
                    >
                        {duplicatedKeywords.map((keyword, index) => (
                            <div key={index} className="flex items-center gap-3 sm:gap-4 md:gap-5">
                                <span
                                    className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider text-gray-900 dark:text-white"
                                    style={{
                                        fontFamily: "'Instrument Serif', serif",
                                    }}
                                >
                                    {keyword}
                                </span>
                                <span
                                    className="text-base sm:text-lg text-gray-900 dark:text-white"
                                    style={{
                                        fontFamily: "'Instrument Serif', serif",
                                    }}
                                >
                                    +
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
