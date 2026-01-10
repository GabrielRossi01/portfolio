"use client";

import { useMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { memo, useMemo } from 'react';

const BannerItem = memo(({ keyword, theme }: { keyword: string; theme: string }) => (
    <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
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
));

BannerItem.displayName = 'BannerItem';

export default memo(function ScrollingBanner() {
    const isMobile = useMobile();
    const { theme } = useTheme();
    const { language } = useLanguage();

    const keywordsByLanguage = useMemo(() => ({
        'pt-BR': ['DINÂMICO', 'ESCALÁVEL', 'INTERATIVO', 'SEGURO', 'CONFIÁVEL', 'ENVOLVENTE', 'ACESSÍVEL'],
        'en': ['DYNAMIC', 'SCALABLE', 'INTERACTIVE', 'SECURE', 'RELIABLE', 'ENGAGING', 'ACCESSIBLE'],
        'es': ['DINÁMICO', 'ESCALABLE', 'INTERACTIVO', 'SEGURO', 'CONFIABLE', 'ATRACTIVO', 'ACCESIBLE'],
    }), []);

    const keywords = useMemo(() => keywordsByLanguage[language], [language, keywordsByLanguage]);
    const duplicatedKeywords = useMemo(() => (isMobile ? [...keywords, ...keywords] : [...keywords, ...keywords, ...keywords]), [keywords, isMobile]);
    const duration = useMemo(() => (isMobile ? 5 : 15), [isMobile]);

    if (isMobile && typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches) {
        return (
            <div className="relative w-full overflow-hidden py-4 sm:py-6 md:py-8 px-4">
                <div className="glass-liquid rounded-lg p-3 sm:p-4 text-center text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    {keywords.join(' • ')}
                </div>
            </div>
        );
    }

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
                        className="flex gap-6 sm:gap-8 md:gap-10 whitespace-nowrap"
                        style={{
                            animation: `scroll-x ${duration}s linear infinite`,
                        }}
                    >
                        {duplicatedKeywords.map((keyword, index) => (
                            <BannerItem key={`${keyword}-${index}`} keyword={keyword} theme={theme} />
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
                        className="flex gap-6 sm:gap-8 md:gap-10 whitespace-nowrap"
                        style={{
                            animation: `scroll-x ${duration}s linear infinite`,
                            animationDirection: 'reverse',
                        }}
                    >
                        {duplicatedKeywords.map((keyword, index) => (
                            <BannerItem key={`${keyword}-rev-${index}`} keyword={keyword} theme={theme} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
});