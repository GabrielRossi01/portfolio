"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ScrollingBanner() {
    const [isMobile, setIsMobile] = useState(false);
    const { theme } = useTheme();
    const { language } = useLanguage();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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
    const duration = isMobile ? 10 : 15;

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
                        animate={{ x: ['0%', '-33.333%'] }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: duration,
                                ease: "linear",
                            },
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
                        className="flex gap-6 sm:gap-8 md:gap-10 whitespace-nowrap"
                        animate={{ x: ['-33.333%', '0%'] }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: duration,
                                ease: "linear",
                            },
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
