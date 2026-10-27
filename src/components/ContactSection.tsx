"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MailCheck, Send, X, XCircle } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const SERIF = { fontFamily: "'Instrument Serif', serif" };

const inputClasses =
  "w-full border-0 border-b border-black/30 bg-transparent px-0 py-3 text-xl font-light text-gray-900 outline-none transition-colors placeholder:text-gray-500 focus:border-orange-500 sm:py-4 sm:text-2xl dark:border-white/30 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-orange-400";

const rowLinkClasses =
  "group inline-flex w-fit cursor-pointer items-center gap-1.5 transition-colors hover:text-orange-600 dark:hover:text-orange-400";

export default function ContactSection() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const titleWords = t.footer.title.split(" ");
  const titleLead = titleWords.slice(0, -1).join(" ");
  const titleLast = titleWords[titleWords.length - 1];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsSubmitting(true);
    setToast(null);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.error("Erro ao enviar email", await response.json());

        setToast({
          type: "error",
          message: t.contactFeedback.errorMessage,
        });

        return;
      }

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setToast({
        type: "success",
        message: t.contactFeedback.successMessage,
      });
    } catch (error) {
      console.error("Erro na requisição:", error);

      setToast({
        type: "error",
        message: t.contactFeedback.errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="px-3 py-12 xs:px-4 sm:py-16 lg:px-6 lg:py-24"
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-70 flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm"
            onClick={() => setToast(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.94 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-feedback-title"
              aria-describedby="contact-feedback-message"
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/30 bg-white/75 p-7 text-center shadow-[0_24px_80px_rgba(0,0,0,0.2)] backdrop-blur-2xl dark:border-white/15 dark:bg-black/50 dark:shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
            >
              <button
                type="button"
                onClick={() => setToast(null)}
                aria-label={t.contactFeedback.closeButton}
                className="absolute right-4 top-4 cursor-pointer rounded-full p-2 text-gray-500 transition hover:bg-black/5 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full border shadow-lg ${
                  toast.type === "success"
                    ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-500 dark:text-emerald-300"
                    : "border-red-400/40 bg-red-500/15 text-red-500 dark:text-red-300"
                }`}
              >
                {toast.type === "success" ? (
                  <MailCheck className="h-8 w-8" strokeWidth={1.7} />
                ) : (
                  <XCircle className="h-8 w-8" strokeWidth={1.7} />
                )}
              </div>

              <h3
                id="contact-feedback-title"
                className="mt-5 text-xl font-medium text-gray-800 dark:text-white"
              >
                {toast.type === "success"
                  ? t.contactFeedback.successTitle
                  : t.contactFeedback.errorTitle}
              </h3>

              <p
                id="contact-feedback-message"
                className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
              >
                {toast.message}
              </p>

              <button
                type="button"
                onClick={() => setToast(null)}
                className="mt-6 inline-flex min-h-10 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white/70 px-6 py-2.5 text-sm font-medium text-gray-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_22px_rgba(0,0,0,0.08)] backdrop-blur-xl transition hover:bg-white active:scale-[0.98] dark:border-white/15 dark:bg-white/10 dark:text-white dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_8px_22px_rgba(0,0,0,0.25)] dark:hover:bg-white/16"
              >
                {t.contactFeedback.closeButton}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-6xl">
        {/* Título e informações */}
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2
              style={SERIF}
              className="text-6xl leading-[0.92] tracking-tight text-gray-800 xs:text-7xl sm:text-8xl lg:text-9xl dark:text-white"
            >
              {titleLead && <span className="block">{titleLead}</span>}

              <span className="block pl-[10%] sm:pl-[18%]">
                <span className="gradient-orange-accent inline-block pr-[0.12em] italic">
                  {titleLast}
                </span>
              </span>
            </h2>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="divide-y divide-black/20 border-y border-black/20 text-xs font-medium uppercase tracking-wide text-gray-800 sm:text-sm dark:divide-white/20 dark:border-white/20 dark:text-white"
          >
            <div className="grid grid-cols-[6rem_1fr] gap-4 py-4 sm:grid-cols-[7rem_1fr]">
              <dt className="text-gray-600 dark:text-gray-400">
                {t.contactInfo.emailLabel}
              </dt>
              <dd>
                <a
                  href="mailto:rossi17006@gmail.com"
                  className={`${rowLinkClasses} break-all`}
                >
                  rossi17006@gmail.com
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </dd>
            </div>

            <div className="grid grid-cols-[6rem_1fr] gap-4 py-4 sm:grid-cols-[7rem_1fr]">
              <dt className="text-gray-600 dark:text-gray-400">
                {t.contactInfo.socialLabel}
              </dt>
              <dd className="flex flex-col gap-2">
                <a
                  href="https://github.com/GabrielRossi01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={rowLinkClasses}
                >
                  GitHub
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>

                <a
                  href="https://www.linkedin.com/in/gabriel-oliveira-rossi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={rowLinkClasses}
                >
                  LinkedIn
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </dd>
            </div>

            <div className="grid grid-cols-[6rem_1fr] gap-4 py-4 sm:grid-cols-[7rem_1fr]">
              <dt className="text-gray-600 dark:text-gray-400">
                {t.contactInfo.locationLabel}
              </dt>
              <dd>{t.contactPanel.location}</dd>
            </div>
          </motion.dl>
        </div>

        {/* Texto e formulário */}
        <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-md space-y-5 text-sm font-light leading-relaxed text-gray-800 sm:text-base dark:text-gray-300"
          >
            <p>{t.contactPanel.message}</p>
            <p>{t.contactPanel.panelMessage}</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6 sm:space-y-8"
            aria-busy={isSubmitting}
          >
            <div>
              <label htmlFor="name" className="sr-only">
                {t.footer.namePlaceholder}
              </label>

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={(event) =>
                  setFormData({ ...formData, name: event.target.value })
                }
                placeholder={t.footer.namePlaceholder}
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(event) =>
                  setFormData({ ...formData, email: event.target.value })
                }
                placeholder={t.footer.emailPlaceholder}
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="message" className="sr-only">
                {t.footer.messagePlaceholder}
              </label>

              <textarea
                id="message"
                name="message"
                required
                rows={3}
                value={formData.message}
                onChange={(event) =>
                  setFormData({ ...formData, message: event.target.value })
                }
                placeholder={t.footer.messagePlaceholder}
                className={`${inputClasses} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-black/10 bg-white/70 px-6 py-3 text-sm font-light text-gray-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-xl transition hover:bg-white hover:shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_10px_28px_rgba(0,0,0,0.12)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:bg-white/9 dark:text-white dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_8px_24px_rgba(0,0,0,0.25)] dark:hover:bg-white/15 sm:w-auto"
            >
              {isSubmitting ? (
                t.contactInfo.sending
              ) : (
                <>
                  {t.footer.sendButton}

                  <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
