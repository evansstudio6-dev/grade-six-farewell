import { motion } from "framer-motion";
import { useState } from "react";
import { Particles } from "./Particles";

export function Goodbye() {
  const [thanked, setThanked] = useState(false);
  return (
    <section className="vignette relative overflow-hidden bg-ink py-32 text-cream">
      <Particles count={25} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.72_0.12_70/0.15),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mb-4 text-xs uppercase tracking-[0.6em] text-gold/70"
        >
          The End
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          className="font-display text-4xl leading-tight md:text-6xl"
        >
          We laughed, we learned,<br />
          <span className="italic text-gold">we grew together.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1.4 }}
          className="mx-auto mt-8 max-w-xl font-serif text-xl italic text-cream/70 md:text-2xl"
        >
          And now… this chapter finally comes to an end.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setThanked(true)}
          className="mt-12 rounded-full border border-gold/60 bg-gold/10 px-10 py-5 text-sm uppercase tracking-[0.3em] text-cream backdrop-blur-md transition hover:bg-gold hover:text-ink"
        >
          {thanked ? "Forever in our hearts ❤️" : "Thank You For The Memories ❤️"}
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="mt-20 border-t border-cream/10 pt-8"
        >
          <p className="font-display text-2xl italic text-cream/60">Grade 6 — Have Been Completed</p>
          <p className="mt-2 text-xs uppercase tracking-[0.5em] text-cream/30">2020 — 2026 • Reel ends here</p>
        </motion.div>
      </div>
    </section>
  );
}
