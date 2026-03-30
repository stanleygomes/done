import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import Image from "next/image";

export function PreviewSection() {
  const { t } = useTranslation();

  return (
    <section
      id="app"
      className="py-24 md:py-32 bg-main/5 border-b-4 border-border overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <h2 className="mb-6 inline-block border-4 border-border bg-orange-400 px-8 py-4 text-3xl font-black uppercase tracking-tighter text-main-foreground shadow-[8px_8px_0px_0px_var(--border)] md:text-5xl">
            {t("landing.preview.title")}
          </h2>
          <p className="max-w-2xl text-lg font-bold text-foreground/60 leading-tight">
            {t("landing.preview.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          className="relative mx-auto max-w-5xl group"
        >
          <div className="rounded-base border-4 md:border-8 border-border bg-white shadow-[10px_10px_0px_0px_var(--border)] md:shadow-[20px_20px_0px_0px_var(--border)] overflow-hidden transition-all group-hover:translate-x-1 group-hover:translate-y-1 md:group-hover:translate-x-2 md:group-hover:translate-y-2 group-hover:shadow-none">
            <Image
              src="/images/app-screenshot.png"
              alt="App Screenshot"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </div>
          {/* Decorative dots */}
          <motion.div
            initial={{ opacity: 0, rotate: -45 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute -top-10 -right-10 hidden lg:block h-24 w-24 bg-[radial-gradient(circle_at_center,#000_15%,transparent_15%)] bg-[size:12px_12px]"
          />
          <motion.div
            initial={{ opacity: 0, rotate: 45 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="absolute -bottom-10 -left-10 hidden lg:block h-24 w-24 bg-[radial-gradient(circle_at_center,#000_15%,transparent_15%)] bg-[size:12px_12px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
