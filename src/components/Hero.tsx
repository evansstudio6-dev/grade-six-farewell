import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Particles } from "./Particles";
import heroPhoto from "@/assets/memories/m1.jpg";

export function Hero() {
  return (
    <section className="vignette relative h-screen w-full overflow-hidden bg-ink">
      <img
        src={heroPhoto}
        alt="Class of 2026 — SDN 2 Boliyohuto"
        className="absolute inset-0 h-full w-full object-cover opacity-70 cinematic-flicker"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/50 to-ink/95" />
      <Particles count={40} />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.2 }}
          className="mb-6 text-xs uppercase tracking-[0.5em] text-cream/60"
        >
          — Class of 2026 • SDN 2 Boliyohuto —
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1.5, ease: "easeOut" }}
          className="font-display text-7xl font-bold leading-none text-cream sm:text-8xl md:text-[10rem]"
        >
          Grade 6
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.6em" }}
          transition={{ delay: 1.1, duration: 1.5 }}
          className="mt-2 text-2xl font-light text-gold sm:text-3xl md:text-5xl"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          MEMORIES
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-6 font-serif text-xl italic text-cream/80 sm:text-2xl md:text-3xl"
        >
          Have Been Completed
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-8 max-w-xl text-sm leading-relaxed text-cream/60 sm:text-base"
        >
          Enam tahun berlalu seperti satu helaan napas. Tawa di kantin, deru hujan
          di jendela kelas, dan suara bel terakhir — semuanya tersimpan di sini.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#memories"
            className="group relative overflow-hidden rounded-full border border-cream/40 bg-cream/10 px-8 py-3 text-sm uppercase tracking-widest text-cream backdrop-blur-md transition hover:bg-cream hover:text-ink"
          >
            Open Memories
          </a>
          <Link
            to="/video"
            className="rounded-full border border-gold/60 px-8 py-3 text-sm uppercase tracking-widest text-gold transition hover:bg-gold hover:text-ink"
          >
            ▶ Watch Videos
          </Link>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-cream/50"
      >
        scroll ↓
      </motion.div>
    </section>
  );
}
