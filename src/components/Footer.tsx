"use client";

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

export default function Footer() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: 'rossi17006@gmail.com',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      toast.success(t.footer.sendButton === 'Enviar Mensagem' ? 'Mensagem enviada com sucesso!' : 'Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error(t.footer.sendButton === 'Enviar Mensagem' ? 'Erro ao enviar mensagem. Tente novamente.' : 'Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/GabrielRossi01', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/gabriel-rossi-155baa324/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:rossi17006@gmail.com', label: 'Email' },
  ];

  return (
    <footer id="contact" className="py-24 px-4 relative min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-2xl mx-auto w-full">
        {/* Centered Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            {t.footer.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {t.footer.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass-bubble rounded-2xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder={t.footer.namePlaceholder}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={isSubmitting}
                className="w-full px-6 py-4 glass border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder={t.footer.emailPlaceholder}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isSubmitting}
                className="w-full px-6 py-4 glass border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              />
            </div>
            <div>
              <textarea
                placeholder={t.footer.messagePlaceholder}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                disabled={isSubmitting}
                rows={6}
                className="w-full px-6 py-4 glass border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              />
            </div>
            <motion.button
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-linear-to-r from-purple-500 to-blue-500 rounded-xl font-medium text-white text-lg hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t.footer.sendButton === 'Enviar Mensagem' ? 'Enviando...' : 'Sending...'}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {t.footer.sendButton}
                </>
              )}
            </motion.button>
          </form>

          {/* Social Links */}
          <div className="mt-10 pt-8 border-t border-gray-300 dark:border-white/10">
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="glass-bubble p-4 rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-colors backdrop-blur-xl"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6 text-gray-900 dark:text-white" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-gray-600 dark:text-gray-500"
        >
          <p>© 2024 {t.hero.name}. {t.footer.rights}</p>
        </motion.div>
      </div>
    </footer>
  );
}