import { useEffect, useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Post = {
  id: string;
  title: string;
  kind: "video" | "album";
  body: string | null;
  media_url: string;
  created_at: string;
};

function isVideo(url: string) {
  return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(url);
}

export function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [kind, setKind] = useState<"video" | "album">("album");
  const [body, setBody] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [sending, setSending] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setPosts(data as Post[]);
    })();

    const channel = supabase
      .channel("posts-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload) => setPosts((prev) => [payload.new as Post, ...prev]),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !mediaUrl.trim()) {
      toast.error("Judul dan link media wajib diisi");
      return;
    }
    setSending(true);
    const { error } = await supabase.from("posts").insert({
      title: title.trim().slice(0, 120),
      kind,
      body: body.trim().slice(0, 500) || null,
      media_url: mediaUrl.trim(),
    });
    setSending(false);
    if (error) {
      toast.error("Gagal mengirim post");
      return;
    }
    toast.success("Post terkirim ✨");
    setTitle("");
    setBody("");
    setMediaUrl("");
    setOpen(false);
  };

  return (
    <section className="relative bg-ink py-24 text-cream">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.5em] text-gold/70">Reel 03</p>
          <h2 className="font-display text-5xl md:text-6xl">Our Feed</h2>
          <p className="mx-auto mt-4 max-w-xl font-serif text-lg italic text-cream/60">
            Tulis judul, pilih jenis, tempel link foto atau video — kenangannya muncul di sini.
          </p>
          <button
            onClick={() => setOpen((v) => !v)}
            data-cursor
            className="mt-6 rounded-full border border-gold/50 bg-gold/10 px-6 py-2 text-xs uppercase tracking-[0.3em] text-gold transition hover:bg-gold hover:text-ink"
          >
            {open ? "Tutup" : "+ Buat Post"}
          </button>
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={submit}
              className="mx-auto mb-16 grid max-w-2xl gap-3 overflow-hidden rounded-2xl border border-cream/10 bg-cream/5 p-6 backdrop-blur"
            >
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Judul kenangan..."
                maxLength={120}
                className="rounded-lg border border-cream/15 bg-ink/40 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
              />
              <div className="flex gap-2">
                {(["album", "video"] as const).map((k) => (
                  <button
                    type="button"
                    key={k}
                    onClick={() => setKind(k)}
                    className={`flex-1 rounded-lg border px-4 py-2 text-xs uppercase tracking-[0.3em] transition ${
                      kind === k
                        ? "border-gold bg-gold text-ink"
                        : "border-cream/15 bg-ink/40 text-cream/70 hover:border-cream/40"
                    }`}
                  >
                    {k === "album" ? "📷 Album" : "🎬 Video"}
                  </button>
                ))}
              </div>
              <input
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="Link foto / video (https://...)"
                className="rounded-lg border border-cream/15 bg-ink/40 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
              />
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Cerita singkat (opsional)..."
                maxLength={500}
                rows={3}
                className="resize-none rounded-lg border border-cream/15 bg-ink/40 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
              />
              <button
                type="submit"
                disabled={sending}
                className="rounded-lg bg-gold py-3 text-xs uppercase tracking-[0.3em] text-ink transition hover:bg-cream disabled:opacity-50"
              >
                {sending ? "Mengirim..." : "Posting"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {posts.length === 0 ? (
          <p className="text-center font-serif italic text-cream/40">
            Belum ada post. Jadilah yang pertama bercerita.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            <AnimatePresence>
              {posts.map((p, i) => (
                <motion.article
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: (i % 4) * 0.05 }}
                  className="group overflow-hidden rounded-2xl border border-cream/10 bg-ink/60 shadow-[var(--shadow-cinematic)] transition hover:border-gold/40"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-ink">
                    {p.kind === "video" || isVideo(p.media_url) ? (
                      <video
                        src={p.media_url}
                        controls
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <img
                        src={p.media_url}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        style={{ filter: "sepia(0.2) contrast(1.05)" }}
                      />
                    )}
                    <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-gold backdrop-blur">
                      {p.kind === "video" ? "🎬 Video" : "📷 Album"}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl">{p.title}</h3>
                    {p.body && (
                      <p className="mt-2 font-serif italic text-cream/60">{p.body}</p>
                    )}
                    <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-cream/30">
                      {new Date(p.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
