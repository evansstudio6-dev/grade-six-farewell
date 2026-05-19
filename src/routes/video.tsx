import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CustomCursor } from "@/components/CustomCursor";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/video")({
  component: VideoPage,
  head: () => ({
    meta: [
      { title: "Videos — Grade 6 Memories" },
      {
        name: "description",
        content:
          "Cuplikan video kenangan kelas 6 SDN 2 Boliyohuto — tawa, momen, dan perpisahan yang terabadikan.",
      },
      { property: "og:title", content: "Videos — Grade 6 Memories" },
      { property: "og:description", content: "Video kenangan Class of 2026." },
    ],
  }),
});

type Clip = { src: string; title: string; subtitle: string };

const baseClips: Clip[] = [
  {
    src: "/media/hero.mp4",
    title: "Sebuah Pembuka",
    subtitle: "Momen-momen hangat dari hari-hari terakhir di kelas 6.",
  },
  {
    src: "/media/video2.mp4",
    title: "Kenangan Terakhir",
    subtitle: "Cuplikan kebersamaan yang akan selalu kami ingat.",
  },
];

function prettify(name: string) {
  return name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function VideoCard({ clip, index }: { clip: Clip; index: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl border border-cream/10 bg-ink shadow-[var(--shadow-cinematic)]"
    >
      <div className="relative aspect-video w-full">
        <video
          ref={ref}
          src={clip.src}
          playsInline
          preload="metadata"
          onEnded={() => setPlaying(false)}
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
          className="h-full w-full object-cover"
        />
        <button
          onClick={toggle}
          aria-label={playing ? "Pause video" : "Play video"}
          className={`absolute inset-0 grid place-items-center transition ${
            playing ? "bg-transparent opacity-0 hover:opacity-100" : "bg-ink/40"
          }`}
        >
          <span className="grid h-20 w-20 place-items-center rounded-full border border-cream/60 bg-cream/10 text-3xl text-cream backdrop-blur-md transition group-hover:scale-110 group-hover:bg-gold group-hover:text-ink">
            {playing ? "❚❚" : "▶"}
          </span>
        </button>
      </div>
      <div className="border-t border-cream/10 bg-ink/80 p-6 text-cream">
        <h3 className="font-display text-2xl md:text-3xl">{clip.title}</h3>
        <p className="mt-2 font-serif italic text-cream/60">{clip.subtitle}</p>
      </div>
    </motion.div>
  );
}


function VideoPage() {
  const [clips, setClips] = useState<Clip[]>(baseClips);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.storage
        .from("memories")
        .list("videos", { limit: 100, sortBy: { column: "name", order: "asc" } });
      if (!data) return;
      const extra = data
        .filter((f) => f.name && !f.name.startsWith("."))
        .map((f) => ({
          src: supabase.storage.from("memories").getPublicUrl(`videos/${f.name}`).data.publicUrl,
          title: prettify(f.name),
          subtitle: "Kenangan tambahan dari kelas kami.",
        }));
      setClips([...baseClips, ...extra]);
    })();
  }, []);

  return <VideoPageInner clips={clips} />;
}

function VideoPageInner({ clips }: { clips: Clip[] }) {
  return (
    <div className="grain relative min-h-screen bg-ink text-cream">
      <ScrollProgress />
      <CustomCursor />
      <main className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="mb-12 flex items-center justify-between">
          <Link to="/" className="text-xs uppercase tracking-[0.4em] text-cream/60 transition hover:text-gold">
            ← Back Home
          </Link>
          <p className="text-xs uppercase tracking-[0.4em] text-cream/40">Reel · 2026</p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.6em] text-gold/70">— Moving Pictures —</p>
          <h1 className="font-display text-5xl leading-none md:text-7xl">
            Our <span className="italic text-gold">Videos</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-serif italic text-cream/60 md:text-lg">
            Tekan tombol play, lalu biarkan suara dan gambarnya membawa kamu kembali ke kelas 6 — sebelum semuanya berlalu.
          </p>
        </motion.div>
        <div className="grid gap-10">
          {clips.map((c, i) => (
            <VideoCard key={c.src} clip={c} index={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
