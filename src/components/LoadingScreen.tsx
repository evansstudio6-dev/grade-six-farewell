import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2200);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-ink"
        >
          <div className="relative h-32 w-32">
            <div className="reel absolute inset-0 rounded-full border-4 border-cream/20" />
            <div className="reel absolute inset-2 rounded-full border-2 border-dashed border-gold/60" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="h-3 w-3 rounded-full bg-gold" />
            </div>
            {[0, 60, 120, 180, 240, 300].map(deg => (
              <div
                key={deg}
                className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream/80"
                style={{ transform: `rotate(${deg}deg) translateY(-44px)` }}
              />
            ))}
          </div>
          <p className="mt-8 font-serif text-2xl italic text-cream/90">Loading memories…</p>
          <p className="mt-2 text-xs uppercase tracking-[0.4em] text-cream/40">Reel 06 • 2026</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
