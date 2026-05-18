import { motion } from "framer-motion";

const chapters = [
  { year: "2020", title: "Hari Pertama", text: "Tas terlalu besar, sepatu masih kaku, dan nama-nama baru yang sulit diingat." },
  { year: "2021", title: "Belajar dari Rumah", text: "Layar HP menjadi kelas, suara guru terdengar lewat speaker kecil." },
  { year: "2022", title: "Kembali Berkumpul", text: "Bertemu lagi setelah lama. Tinggi badan berubah, tapi tawa tetap sama." },
  { year: "2023", title: "Petualangan Baru", text: "Karyawisata pertama, kemping, dan rahasia-rahasia kecil di belakang sekolah." },
  { year: "2024", title: "Mimpi Mulai Tumbuh", text: "Mulai bicara soal cita-cita. Astronot, dokter, pemain bola, penulis." },
  { year: "2026", title: "Perpisahan", text: "Foto kelas terakhir. Pelukan yang terlalu cepat berakhir." },
];

export function Journey() {
  return (
    <section id="journey" className="relative overflow-hidden bg-background py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20 text-center"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.5em] text-sepia">Chapter Timeline</p>
          <h2 className="font-display text-5xl text-ink md:text-7xl">Our Journey</h2>
          <p className="mx-auto mt-4 max-w-xl font-serif text-lg italic text-muted-foreground">
            Enam tahun, enam babak. Setiap halaman ditulis dengan tinta yang berbeda.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-vintage/40 to-transparent md:left-1/2" />
          {chapters.map((c, i) => (
            <motion.div
              key={c.year}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`relative mb-16 flex flex-col gap-6 md:flex-row md:items-center ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="absolute left-4 top-3 h-3 w-3 -translate-x-1/2 rounded-full bg-gold ring-4 ring-background md:left-1/2" />
              <div className="ml-12 flex-1 md:ml-0 md:px-12">
                <p className="font-display text-6xl text-gold/40">{c.year}</p>
                <h3 className="mt-2 font-display text-3xl text-ink">{c.title}</h3>
                <p className="mt-3 font-serif text-lg italic text-muted-foreground">{c.text}</p>
              </div>
              <div className="hidden flex-1 md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
