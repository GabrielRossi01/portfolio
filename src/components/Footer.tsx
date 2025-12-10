"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, Send, Loader2, User, MessageSquare } from 'lucide-react';
import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';

export default function Footer() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const containerRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const footerY = useTransform(scrollYProgress, [0, 1], ["100px", "0px"]);
  const footerOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(t.footer.sendButton === 'Enviar Mensagem' ? 'Mensagem enviada com sucesso!' : 'Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send');
      }
    } catch {
      toast.error(t.footer.sendButton === 'Enviar Mensagem' ? 'Erro ao enviar. Tente novamente.' : 'Failed to send. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ecosystemLinks = [
    { label: t.footer.sendButton === 'Enviar Mensagem' ? 'Comunidade' : 'Community', href: '#' },
    { label: t.footer.sendButton === 'Enviar Mensagem' ? 'Vitrine' : 'Showcase', href: '#' },
    { label: t.footer.sendButton === 'Enviar Mensagem' ? 'Contribuição' : 'Contribution', href: '#' },
  ];

  const aboutLinks = [
    { label: t.footer.sendButton === 'Enviar Mensagem' ? 'Imprensa' : 'Press', href: '#' },
    { label: t.footer.sendButton === 'Enviar Mensagem' ? 'Telemetria' : 'Telemetry', href: '#' },
    { label: t.footer.sendButton === 'Enviar Mensagem' ? 'Faça parceria conosco!' : 'Partner with us!', href: '#' },
  ];

  const moreLinks = [
    { label: 'Blog', href: '#' },
    { label: t.footer.sendButton === 'Enviar Mensagem' ? 'Loja de brindes' : 'Merch Store', href: '#' },
    { label: 'Wallpapers', href: '#' },
    { label: 'Studio', href: '#' },
  ];

  return (
    <footer
      ref={containerRef}
      id="contact"
      className="relative min-h-[80vh] overflow-hidden"
    >
      <motion.div
        className={`absolute inset-0 pointer-events-none ${theme === 'dark'
            ? 'bglinearom-black via-[#0a0a0a] to-transparent'
            : 'bg-linear-to-t from-gray-100 via-gray-50 to-transparent'
          }`}
        style={{ y: footerY }}
      />

      <motion.div
        className="relative z-10 pt-16 sm:pt-24 pb-8"
        style={{ y: footerY, opacity: footerOpacity }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16"
          >
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-px bg-linear-to-br from-purple-500/30 via-blue-500/30 to-cyan-500/30">
              <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 via-transparent to-cyan-500/10 animate-pulse" />
              <div className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 backdrop-blur-xl ${theme === 'dark' ? 'bg-[#0a0a0a]/90' : 'bg-white/90'
                }`}>
                <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl">
                  <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-linear-to-br from-purple-500/5 to-transparent rounded-full blur-3xl" />
                  <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-linear-to-tl from-blue-500/5 to-transparent rounded-full blur-3xl" />
                </div>

                <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent ${theme === 'dark'
                          ? 'bg-linear-to-r from-white via-purple-200 to-blue-200'
                          : 'bg-linear-to-r from-gray-900 via-purple-700 to-blue-700'
                        }`}>
                        {t.footer.title}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 max-w-md">
                        {t.footer.subtitle}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="flex flex-wrap gap-3"
                    >
                      {[
                        { icon: Github, href: 'https://github.com', label: 'GitHub', color: 'from-gray-500 to-gray-700' },
                        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'from-blue-500 to-blue-700' },
                        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'from-sky-400 to-sky-600' },
                        { icon: Mail, href: 'mailto:rossi17006@gmail.com', label: 'Email', color: 'from-purple-500 to-purple-700' },
                      ].map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className={`relative p-3 sm:p-4 rounded-xl bg-linear-to-br ${social.color} bg-opacity-10 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all group`}
                          aria-label={social.label}
                        >
                          <social.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                          <div className="absolute inset-0 rounded-xl bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.a>
                      ))}
                    </motion.div>
                  </div>

                  <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="space-y-4 sm:space-y-5"
                  >
                    <div className="relative group">
                      <div className="absolute inset-0 bg-linear-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                      <div className="relative flex items-center">
                        <User className="absolute left-4 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={t.footer.namePlaceholder}
                          required
                          disabled={isSubmitting}
                          className={`w-full pl-12 pr-4 py-3.5 sm:py-4 border rounded-xl placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none transition-all text-sm sm:text-base disabled:opacity-50 ${theme === 'dark'
                              ? 'bg-white/5 border-white/10 text-white focus:border-purple-500/50 focus:bg-white/10'
                              : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500/50 focus:bg-white'
                            }`}
                        />
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-0 bg-linear-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                      <div className="relative flex items-center">
                        <Mail className="absolute left-4 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={t.footer.emailPlaceholder}
                          required
                          disabled={isSubmitting}
                          className={`w-full pl-12 pr-4 py-3.5 sm:py-4 border rounded-xl placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none transition-all text-sm sm:text-base disabled:opacity-50 ${theme === 'dark'
                              ? 'bg-white/5 border-white/10 text-white focus:border-purple-500/50 focus:bg-white/10'
                              : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500/50 focus:bg-white'
                            }`}
                        />
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-0 bg-linear-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder={t.footer.messagePlaceholder}
                          required
                          disabled={isSubmitting}
                          rows={4}
                          className={`w-full pl-12 pr-4 py-3.5 sm:py-4 border rounded-xl placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none transition-all resize-none text-sm sm:text-base disabled:opacity-50 ${theme === 'dark'
                              ? 'bg-white/5 border-white/10 text-white focus:border-purple-500/50 focus:bg-white/10'
                              : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500/50 focus:bg-white'
                            }`}
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 sm:py-4 relative overflow-hidden rounded-xl font-medium text-white text-sm sm:text-base transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed group"
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-purple-600 via-blue-600 to-cyan-600" />
                      <div className="absolute inset-0 bg-linear-to-r from-purple-500 via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="relative z-10 flex items-center gap-2">
                        {isSubmitting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            {t.footer.sendButton}
                          </>
                        )}
                      </span>
                    </motion.button>
                  </motion.form>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
            <div className="col-span-2 sm:col-span-2 lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">+</span>
                </div>
                <span className="text-gray-900 dark:text-white font-semibold text-xl">pluvia+</span>
              </motion.div>
              <p className="text-gray-500 text-sm">
                Copyright © 2025 - {t.footer.rights}
              </p>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-gray-900 dark:text-white font-semibold mb-4">
                  {t.footer.sendButton === 'Enviar Mensagem' ? 'Ecossistema' : 'Ecosystem'}
                </h4>
                <ul className="space-y-3">
                  {ecosystemLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-gray-900 dark:text-white font-semibold mb-4">
                  {t.footer.sendButton === 'Enviar Mensagem' ? 'Sobre' : 'About'}
                </h4>
                <ul className="space-y-3">
                  {aboutLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="text-gray-900 dark:text-white font-semibold mb-4">
                  {t.footer.sendButton === 'Enviar Mensagem' ? 'Mais links' : 'More links'}
                </h4>
                <ul className="space-y-3">
                  {moreLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h4 className="text-gray-900 dark:text-white font-semibold mb-4">
                  {t.footer.sendButton === 'Enviar Mensagem' ? 'Localização' : 'Location'}
                </h4>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                  <span className="text-xl">🇧🇷</span>
                  <span>Brasil</span>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors text-xs sm:text-sm">
                {t.footer.sendButton === 'Enviar Mensagem' ? 'Política de Privacidade' : 'Privacy Policy'}
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors text-xs sm:text-sm">
                {t.footer.sendButton === 'Enviar Mensagem' ? 'Termos de serviço' : 'Terms of Service'}
              </a>
            </div>

            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-right">
              © 2025 {t.footer.rights}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}