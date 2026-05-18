import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Particles } from "./Particles";
import heroPoster from "@/assets/memories/m2.jpg";

export function Hero() {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="vignette relative h-screen w-full overflow-hidden bg-ink">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={heroPoster}
        className="absolute inset-0 h-full w-full object-cover opacity-70 cinematic-flicker"
      >
        <source src="/media/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/40 to-ink/90" />
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
          <a
            href="#journey"
            className="rounded-full border border-gold/60 px-8 py-3 text-sm uppercase tracking-widest text-gold transition hover:bg-gold hover:text-ink"
          >
            See Our Journey
          </a>
        </motion.div>
      </div>

      <button
        onClick={toggleMute}
        className="absolute bottom-8 right-8 z-20 grid h-12 w-12 place-items-center rounded-full border border-cream/30 bg-ink/40 text-cream backdrop-blur-md transition hover:bg-cream hover:text-ink"
        aria-label="Toggle sound"
      >
        {muted ? "🔇" : "🔊"}
      </button>

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
