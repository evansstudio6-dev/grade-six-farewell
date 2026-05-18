import { motion } from "framer-motion";

export function EpanMessage() {
  return (
    <section className="relative overflow-hidden bg-background py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.72_0.12_70/0.15),transparent_60%)]" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-4 text-xs uppercase tracking-[0.6em] text-vintage/70"
        >
          — A Message from Epan —
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="font-serif text-2xl italic leading-relaxed text-foreground md:text-4xl"
        >
          <span className="text-gold">“</span>
          Terima kasih, Ibu & Bapak Guru, telah menjadi guru terbaik yang pernah
          kami miliki — yang sabar mengajar, menegur, dan mendoakan kami.
          <br />
          <br />
          Dan untuk teman-temanku, terima kasih telah menjadi bagian dari cerita
          ini. Kalian bukan sekadar teman sekelas, kalian adalah kenangan yang
          tidak akan pernah aku lupakan.
          <span className="text-gold">”</span>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-10 font-display text-lg tracking-[0.3em] text-vintage"
        >
          — EPAN
        </motion.p>
        <p className="mt-2 text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Class of 2026
        </p>
      </div>
    </section>
  );
}
