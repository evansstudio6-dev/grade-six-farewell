import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import m1 from "@/assets/memories/m1.jpg";
import m2 from "@/assets/memories/m2.jpg";
import m3 from "@/assets/memories/m3.jpg";
import m4 from "@/assets/memories/m4.jpg";
import m5 from "@/assets/memories/m5.jpg";
import m6 from "@/assets/memories/m6.jpg";
import m7 from "@/assets/memories/m7.jpg";
import m8 from "@/assets/memories/m8.jpg";
import m9 from "@/assets/memories/m9.jpg";

const photos = [
  { src: m1, caption: "Foto kelas tanpa kata-kata — hanya senyum yang berbicara.", date: "Juni 2026" },
  { src: m2, caption: "Hari kartu kelulusan dibagikan. Tangan kami gemetar.", date: "Juni 2026" },
  { src: m3, caption: "Berdiri di teras sekolah untuk yang kesekian kalinya.", date: "Juni 2026" },
  { src: m4, caption: "Pose terakhir bersama Bu Guru tersayang.", date: "Juni 2026" },
  { src: m5, caption: "Tertawa karena hal kecil yang tidak akan pernah kami lupakan.", date: "Mei 2026" },
  { src: m6, caption: "Kartu kuning kecil — bukti enam tahun perjalanan.", date: "Juni 2026" },
  { src: m7, caption: "Peace sign dan langit mendung sebelum hujan.", date: "Mei 2026" },
  { src: m8, caption: "Sebelum upacara dimulai, kami sempat berfoto diam-diam.", date: "Mei 2026" },
  { src: m9, caption: "Para guru yang sabar mengantar kami sampai di sini.", date: "Juni 2026" },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="memories" className="relative bg-ink py-32 text-cream">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.5em] text-gold/70">Reel 01</p>
          <h2 className="font-display text-5xl md:text-7xl">Memories Gallery</h2>
          <p className="mx-auto mt-4 max-w-xl font-serif text-lg italic text-cream/60">
            Tekan setiap bingkai. Setiap foto menyimpan cerita yang belum sempat kami ucapkan.
          </p>
        </motion.div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {photos.map((p, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
              onClick={() => setActive(i)}
              data-cursor
              className="group relative block w-full overflow-hidden rounded-lg border border-cream/10 bg-ink/40 text-left shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] transition hover:border-gold/40"
            >
              <img
                src={p.src}
                alt={p.caption}
                loading="lazy"
                className="w-full transition duration-700 group-hover:scale-105"
                style={{ filter: "sepia(0.25) contrast(1.05) brightness(0.95)" }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold/80">{p.date}</p>
                <p className="mt-1 font-serif text-sm italic text-cream/90 line-clamp-2">{p.caption}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-xl border border-cream/20 bg-ink shadow-2xl"
            >
              <img
                src={photos[active].src}
                alt=""
                className="max-h-[75vh] w-full object-contain"
                style={{ filter: "sepia(0.2) contrast(1.05)" }}
              />
              <div className="bg-gradient-to-t from-ink to-ink/80 p-6">
                <p className="text-xs uppercase tracking-[0.4em] text-gold">{photos[active].date}</p>
                <p className="mt-2 font-serif text-xl italic text-cream">{photos[active].caption}</p>
              </div>
              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-cream/10 text-cream backdrop-blur hover:bg-cream hover:text-ink"
              >
                ✕
              </button>
              <button
                onClick={() => setActive((active - 1 + photos.length) % photos.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream hover:text-ink"
              >
                ‹
              </button>
              <button
                onClick={() => setActive((active + 1) % photos.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream hover:text-ink"
              >
                ›
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
