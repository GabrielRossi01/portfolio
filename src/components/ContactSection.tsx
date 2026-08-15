"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MailCheck,
  MapPin,
  Send,
  X,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function ContactSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();

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

  const isDark = theme === "dark";

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
          message: "Ocorreu um erro ao enviar sua mensagem.",
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
        message: "Email enviado com sucesso!",
      });
    } catch (error) {
      console.error("Erro na requisição:", error);

      setToast({
        type: "error",
        message: "Erro inesperado ao enviar sua mensagem.",
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
                {toast.type === "success"
                  ? t.contactFeedback.successMessage
                  : toast.message}
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 text-center sm:mb-12 lg:mb-14"
        >
          <h2 className="mb-2 text-2xl font-light text-gray-800 xs:text-3xl sm:text-4xl md:text-5xl dark:text-white">
            <span>{t.footer.title.split(" ").slice(0, -1).join(" ")}</span>{" "}
            <span className="gradient-orange-accent">
              {t.footer.title.split(" ").pop()}
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-sm font-light text-gray-900 sm:text-base md:text-lg dark:text-white">
            {t.footer.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl border border-black/10 shadow-2xl dark:border-white/10 lg:grid lg:grid-cols-2"
          style={{
            background: isDark
              ? "rgba(18, 18, 18, 0.78)"
              : "rgba(255, 255, 255, 0.86)",
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
          }}
        >
          <div className="p-5 sm:p-8 lg:p-10 xl:p-12">
            <div className="mb-7">
              <span className="mb-3 block text-xs font-medium uppercase tracking-[0.22em] text-orange-500">
                {t.contactPanel.eyebrow}
              </span>

              <h3 className="text-2xl font-light text-gray-800 sm:text-3xl dark:text-white">
                {t.contactPanel.heading}
              </h3>

              <div className="mt-6 flex items-start gap-3 sm:mt-7">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-orange-400/30 shadow-lg">
                  <Image
                    src="/foto-perfil.jpeg"
                    alt="Gabriel Rossi"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>

                <div className="rounded-2xl rounded-tl-md border border-black/10 bg-black/2.5 px-4 py-3 text-sm font-medium leading-relaxed text-gray-700 dark:border-white/10 dark:bg-white/6 dark:text-gray-300">
                  {t.contactPanel.message}
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              aria-busy={isSubmitting}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
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
                      setFormData({
                        ...formData,
                        name: event.target.value,
                      })
                    }
                    placeholder={t.footer.namePlaceholder}
                    className="min-h-11 w-full rounded-xl border border-black/10 bg-black/2.5 px-4 text-sm font-light text-gray-900 outline-none transition placeholder:text-gray-600 focus:border-orange-500/70 focus:ring-2 focus:ring-orange-500/20 dark:border-white/10 dark:bg-white/6 dark:text-white dark:placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
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
                      setFormData({
                        ...formData,
                        email: event.target.value,
                      })
                    }
                    placeholder={t.footer.emailPlaceholder}
                    className="min-h-11 w-full rounded-xl border border-black/10 bg-black/2.5 px-4 text-sm font-light text-gray-900 outline-none transition placeholder:text-gray-600 focus:border-orange-500/70 focus:ring-2 focus:ring-orange-500/20 dark:border-white/10 dark:bg-white/6 dark:text-white dark:placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {t.footer.messagePlaceholder}
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      message: event.target.value,
                    })
                  }
                  placeholder={t.footer.messagePlaceholder}
                  className="min-h-36 w-full resize-none rounded-xl border border-black/10 bg-black/2.5 px-4 py-3 text-sm font-light text-gray-900 outline-none transition placeholder:text-gray-600 focus:border-orange-500/70 focus:ring-2 focus:ring-orange-500/20 dark:border-white/10 dark:bg-white/6 dark:text-white dark:placeholder:text-gray-400"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-black/10 bg-white/70 px-6 py-3 text-sm font-light text-gray-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-xl transition hover:bg-white hover:shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_10px_28px_rgba(0,0,0,0.12)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:bg-white/9 dark:text-white dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_8px_24px_rgba(0,0,0,0.25)] dark:hover:bg-white/15 sm:w-auto"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    {t.footer.sendButton}

                    <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>

          <aside
            className="relative isolate min-h-[380px] overflow-hidden border-t border-black/10 bg-[#0d0d0d] p-6 sm:min-h-[450px] sm:p-10 lg:min-h-full lg:border-l lg:border-t-0 lg:border-white/10 xl:p-12"
            aria-label={t.contactPanel.panelHeading}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_46%,rgba(255,108,37,0.2),transparent_34%),radial-gradient(circle_at_80%_90%,rgba(175,49,12,0.16),transparent_40%)]" />

            <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-300/35 shadow-[0_0_90px_rgba(255,102,31,0.16)] sm:h-[330px] sm:w-[330px]" />

            <div className="absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rotate-35 rounded-full border border-orange-400/25 sm:h-[270px] sm:w-[270px]" />

            <div className="absolute left-1/2 top-1/2 h-[280px] w-40 -translate-x-1/2 -translate-y-1/2 -rotate-28 rounded-full border border-orange-200/20 sm:h-[360px] sm:w-[200px]" />

            <motion.div
              className="absolute left-[25%] top-[34%] h-2.5 w-2.5 rounded-full bg-orange-300 shadow-[0_0_16px_rgba(255,180,105,0.9)]"
              animate={{
                y: [0, -14, 0],
                opacity: [0.55, 1, 0.55],
              }}
              transition={{
                duration: 3.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute right-[22%] top-[62%] h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_16px_rgba(255,97,24,0.9)]"
              animate={{
                y: [0, 12, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            />

            <div className="relative z-10 flex h-full min-h-[330px] flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  {t.contactPanel.availability}
                </div>

                <div className="mt-8 max-w-sm sm:mt-10">
                  <h3 className="text-3xl font-light leading-tight text-white sm:text-4xl">
                    {t.contactPanel.panelHeading}
                  </h3>

                  <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-gray-300 sm:mt-6 sm:text-base">
                    {t.contactPanel.panelMessage}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <div className="flex items-center gap-2 text-sm font-light text-gray-300">
                  <MapPin className="h-4 w-4 text-orange-300" />
                  <span>{t.contactPanel.location}</span>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <a
                    href="https://github.com/GabrielRossi01"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/6 text-white transition hover:border-orange-300/70 hover:bg-orange-500/15 hover:text-orange-200"
                  >
                    <Github className="h-5 w-5" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/gabriel-oliveira-rossi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/6 text-white transition hover:border-orange-300/70 hover:bg-orange-500/15 hover:text-orange-200"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>

                  <a
                    href="mailto:rossi17006@gmail.com"
                    aria-label="Email"
                    className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/6 text-white transition hover:border-orange-300/70 hover:bg-orange-500/15 hover:text-orange-200"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </motion.div>
      </div>
    </section>
  );
}
