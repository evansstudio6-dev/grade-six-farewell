import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Photo = { url: string; name: string };

export function CloudGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.storage
        .from("memories")
        .list("photos", { limit: 200, sortBy: { column: "name", order: "asc" } });
      if (error || !data) {
        setLoading(false);
        return;
      }
      const files = data
        .filter((f) => f.name && !f.name.startsWith("."))
        .map((f) => ({
          name: f.name,
          url: supabase.storage.from("memories").getPublicUrl(`photos/${f.name}`).data.publicUrl,
        }));
      setPhotos(files);
      setLoading(false);
    })();
  }, []);

  if (loading) return null;
  if (photos.length === 0) return null;

  return (
    <section className="relative bg-ink py-24 text-cream">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.5em] text-gold/70">Reel 02</p>
          <h2 className="font-display text-5xl md:text-6xl">From the Cloud</h2>
          <p className="mx-auto mt-4 max-w-xl font-serif text-lg italic text-cream/60">
            Foto-foto baru yang kami tambahkan dari waktu ke waktu.
          </p>
        </motion.div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {photos.map((p, i) => (
            <motion.button
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
              onClick={() => setActive(i)}
              data-cursor
              className="group relative block w-full overflow-hidden rounded-lg border border-cream/10 bg-ink/40 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] transition hover:border-gold/40"
            >
              <img
                src={p.url}
                alt=""
                loading="lazy"
                className="w-full transition duration-700 group-hover:scale-105"
                style={{ filter: "sepia(0.25) contrast(1.05) brightness(0.95)" }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
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
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={photos[active].url}
              alt=""
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-5xl rounded-xl object-contain shadow-2xl"
              style={{ filter: "sepia(0.2) contrast(1.05)" }}
            />
            <button
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-cream/10 text-cream backdrop-blur hover:bg-cream hover:text-ink"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
