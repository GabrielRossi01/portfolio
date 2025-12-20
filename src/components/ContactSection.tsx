"use client";


import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';


export default function ContactSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);


    await new Promise(resolve => setTimeout(resolve, 1500));


    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };


  return (
    <section id="contact" className="py-8 xs:py-12 md:py-16 lg:py-24 px-2 xs:px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6 xs:mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-1.5 xs:mb-2 sm:mb-3 lg:mb-4">
            <span className="text-gray-800 dark:text-white">
              {t.footer.title.split(' ').slice(0, -1).join(' ')}
            </span>{' '}
            <span className="gradient-orange-accent">
              {t.footer.title.split(' ').pop()}
            </span>
          </h2>
          <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-light text-gray-700 dark:text-gray-300">
            {t.footer.subtitle}
          </p>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="glass-liquid rounded-lg xs:rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 xs:p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-2.5 xs:space-y-3.5 sm:space-y-5 lg:space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs xs:text-xs sm:text-sm font-semibold mb-1 xs:mb-1.5 sm:mb-2 text-gray-800 dark:text-white"
                >
                  {t.footer.namePlaceholder}
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="glass-liquid w-full px-3 xs:px-3.5 sm:px-4 py-2 xs:py-2.5 sm:py-3 rounded-lg xs:rounded-xl text-gray-800 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 transition-all focus:outline-none focus:ring-2 text-xs sm:text-sm"
                  placeholder={t.footer.namePlaceholder}
                />
              </div>


              <div>
                <label
                  htmlFor="email"
                  className="block text-xs xs:text-xs sm:text-sm font-semibold mb-1 xs:mb-1.5 sm:mb-2 text-gray-800 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="glass-liquid w-full px-3 xs:px-3.5 sm:px-4 py-2 xs:py-2.5 sm:py-3 rounded-lg xs:rounded-xl text-gray-800 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 transition-all focus:outline-none focus:ring-2 text-xs sm:text-sm"
                  placeholder={t.footer.emailPlaceholder}
                />
              </div>


              <div>
                <label
                  htmlFor="message"
                  className="block text-xs xs:text-xs sm:text-sm font-semibold mb-1 xs:mb-1.5 sm:mb-2 text-gray-800 dark:text-white"
                >
                  {t.footer.messagePlaceholder}
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="glass-liquid w-full px-3 xs:px-3.5 sm:px-4 py-2 xs:py-2.5 sm:py-3 rounded-lg xs:rounded-xl text-gray-800 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 transition-all focus:outline-none focus:ring-2 resize-none text-xs sm:text-sm"
                  placeholder={t.footer.messagePlaceholder}
                />
              </div>


              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full mt-2 xs:mt-3 sm:mt-4"
              >
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-lg xs:rounded-xl"
                    style={{
                      background: theme === 'dark'
                        ? 'linear-gradient(to bottom, rgba(60, 60, 60, 0.4), rgba(30, 30, 30, 0.6))'
                        : 'linear-gradient(to bottom, rgba(200, 200, 200, 0.4), rgba(150, 150, 150, 0.5))',
                      transform: 'translateY(6px)',
                      borderRadius: '9999px',
                    }}
                  />
                  <div
                    className="relative px-5 xs:px-6 sm:px-10 py-2 xs:py-2.5 sm:py-4 rounded-lg xs:rounded-xl flex items-center justify-center gap-2 font-medium text-xs xs:text-sm sm:text-base transition-all duration-200 group-hover:translate-y-0.5 group-active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: theme === 'dark'
                        ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))'
                        : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(245, 245, 240, 0.9))',
                      backdropFilter: 'blur(20px)',
                      border: theme === 'dark'
                        ? '1px solid rgba(255, 255, 255, 0.15)'
                        : '1px solid rgba(0, 0, 0, 0.08)',
                      boxShadow: theme === 'dark'
                        ? 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3)'
                        : 'inset 0 1px 2px rgba(255, 255, 255, 1), inset 0 -1px 1px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.1)',
                      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(40, 40, 40, 0.9)',
                    }}
                  >
                    {isSubmitting ? (
                      'Enviando...'
                    ) : (
                      <>
                        {t.footer.sendButton}
                        <Send className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                      </>
                    )}
                  </div>
                </div>
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
