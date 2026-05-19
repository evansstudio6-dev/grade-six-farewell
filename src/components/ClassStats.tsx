import { motion } from "framer-motion";

const stats = [
  { label: "Total Years Together", value: "6", suffix: "years", icon: "⏳" },
  { label: "Chaos Level", value: "999", suffix: "%", icon: "🔥" },
  { label: "Homework Survived", value: "∞", suffix: "", icon: "📚" },
  { label: "Exam Stress", value: "Extreme", suffix: "😭", icon: "📝" },
  { label: "Friendships Made", value: "Forever", suffix: "💛", icon: "🤝" },
  { label: "Memories Created", value: "Priceless", suffix: "✨", icon: "🎞️" },
];

export function ClassStats() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 text-cream">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_70%_30%,oklch(0.72_0.12_70/0.4),transparent_60%)]" />
      <div className="vignette absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.6em] text-gold">
            — Behind the Scenes —
          </p>
          <h2 className="font-display text-4xl md:text-6xl">Our Class Stats</h2>
          <p className="mx-auto mt-4 max-w-xl font-serif italic text-cream/60">
            Six years summarized in numbers (and feelings).
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-lg border border-cream/10 bg-cream/5 p-8 backdrop-blur-sm transition hover:border-gold/40 hover:bg-cream/[0.07]"
            >
              <div className="absolute -right-4 -top-4 text-7xl opacity-10 transition group-hover:opacity-20">
                {s.icon}
              </div>
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.3em] text-cream/50">
                  {s.label}
                </p>
                <p className="mt-4 font-display text-5xl text-gold md:text-6xl">
                  {s.value}
                </p>
                {s.suffix && (
                  <p className="mt-1 font-serif text-lg italic text-cream/70">
                    {s.suffix}
                  </p>
                )}
              </div>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
