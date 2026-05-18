import { motion } from "framer-motion";

const quotes = [
  { text: "Sekolah bukan tentang bangunannya. Tentang siapa yang menunggumu di gerbangnya.", author: "— Rahmat, ketua kelas" },
  { text: "Aku akan rindu suara bel istirahat yang selalu terlambat.", author: "— Aisyah" },
  { text: "Terima kasih sudah mengajariku menulis nama panjangku sendiri.", author: "— Untuk Bu Guru" },
  { text: "Kelas 6A bukan ruangan. Itu adalah perasaan.", author: "— Anonim, di balik papan tulis" },
];

const playlist = [
  { title: "Memories", artist: "Maroon 5" },
  { title: "Photograph", artist: "Ed Sheeran" },
  { title: "Kenangan Terindah", artist: "Samsons" },
  { title: "See You Again", artist: "Wiz Khalifa" },
  { title: "Terima Kasih Guruku", artist: "Melly G." },
];

export function Quotes() {
  return (
    <section className="relative overflow-hidden bg-cream py-32">
      <div className="film-strip absolute inset-x-0 top-0 h-6 opacity-90" />
      <div className="film-strip absolute inset-x-0 bottom-0 h-6 opacity-90" />

      <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.5em] text-sepia">Voices</p>
          <h2 className="mb-10 font-display text-4xl text-ink md:text-5xl">Words We Leave Behind</h2>
          <div className="space-y-8">
            {quotes.map((q, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="border-l-2 border-gold pl-5"
              >
                <p className="font-serif text-xl italic leading-relaxed text-ink">"{q.text}"</p>
                <footer className="mt-2 text-sm uppercase tracking-widest text-sepia">{q.author}</footer>
              </motion.blockquote>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.5em] text-sepia">Side B</p>
          <h2 className="mb-10 font-display text-4xl text-ink md:text-5xl">Soundtrack of 2026</h2>
          <div className="rounded-2xl border border-vintage/20 bg-background/60 p-6 backdrop-blur shadow-[var(--shadow-frame)]">
            {playlist.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center justify-between border-b border-vintage/10 py-4 last:border-0"
              >
                <div className="flex items-center gap-4">
                  <span className="font-display text-2xl text-gold">0{i + 1}</span>
                  <div>
                    <p className="font-medium text-ink">{s.title}</p>
                    <p className="text-sm text-muted-foreground">{s.artist}</p>
                  </div>
                </div>
                <span className="text-xs uppercase tracking-widest text-sepia">♪</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
