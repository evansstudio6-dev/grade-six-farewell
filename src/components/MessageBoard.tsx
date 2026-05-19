import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Message = {
  id: string;
  name: string;
  message: string;
  emoji: string | null;
  color: string | null;
  created_at: string;
};

const NOTE_COLORS = [
  "#fde68a",
  "#fbcfe8",
  "#bfdbfe",
  "#bbf7d0",
  "#fed7aa",
  "#ddd6fe",
];

const EMOJIS = ["💛", "✨", "🌸", "📸", "🎓", "🥹", "🫶", "🌈", "⭐", "🎈"];

const rotations = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "rotate-1", "-rotate-2"];

export function MessageBoard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [emoji, setEmoji] = useState("💛");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(60);
    if (data) setMessages(data as Message[]);
  };

  useEffect(() => {
    load();
    const ch = supabase
      .channel("messages-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => [payload.new as Message, ...prev]);
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedText = text.trim();
    if (!trimmedName || !trimmedText) {
      toast.error("Nama dan pesan tidak boleh kosong");
      return;
    }
    if (trimmedName.length > 60 || trimmedText.length > 500) {
      toast.error("Pesan terlalu panjang");
      return;
    }
    setLoading(true);
    const color = NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)];
    const { error } = await supabase.from("messages").insert({
      name: trimmedName,
      message: trimmedText,
      emoji,
      color,
    });
    setLoading(false);
    if (error) {
      toast.error("Gagal mengirim pesan");
      return;
    }
    toast.success("Pesanmu telah ditempel 💌");
    setName("");
    setText("");
  };

  return (
    <section className="relative overflow-hidden bg-cream py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,oklch(0.72_0.12_70/0.12),transparent_55%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.6em] text-vintage/70">
            — Leave Your Message —
          </p>
          <h2 className="font-display text-4xl text-ink md:text-6xl">
            Words on the Wall
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-serif italic text-vintage">
            Tinggalkan pesan, harapan, atau quote untuk teman-teman seangkatan.
          </p>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-2xl rounded-2xl border border-vintage/15 bg-background/70 p-6 shadow-frame backdrop-blur md:p-8"
        >
          <div className="grid gap-4 md:grid-cols-[1fr_auto]">
            <Input
              placeholder="Nama kamu"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={60}
              className="bg-background"
            />
            <div className="flex flex-wrap gap-1">
              {EMOJIS.map((em) => (
                <button
                  key={em}
                  type="button"
                  onClick={() => setEmoji(em)}
                  className={`h-9 w-9 rounded-md text-lg transition ${
                    emoji === em ? "bg-gold/30 scale-110" : "hover:bg-muted"
                  }`}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>
          <Textarea
            placeholder="Tulis pesan, harapan, atau quote..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={500}
            rows={3}
            className="mt-4 resize-none bg-background"
          />
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {text.length}/500
            </span>
            <Button
              type="submit"
              disabled={loading}
              className="bg-ink text-cream hover:bg-ink/90"
            >
              {loading ? "Menempel..." : "Tempel Pesan 📌"}
            </Button>
          </div>
        </motion.form>

        {/* Sticky notes wall */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div
                key={m.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className={`group relative ${rotations[i % rotations.length]} transition hover:rotate-0 hover:scale-105 hover:z-10`}
              >
                <div
                  className="relative flex h-full min-h-[180px] flex-col justify-between rounded-sm p-5 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.25)]"
                  style={{ backgroundColor: m.color || "#fde68a" }}
                >
                  <div className="absolute left-1/2 -top-3 h-6 w-16 -translate-x-1/2 rounded-sm bg-vintage/30 backdrop-blur-sm" />
                  <div className="text-3xl">{m.emoji || "💛"}</div>
                  <p className="my-3 font-serif text-base italic leading-snug text-ink line-clamp-6">
                    {m.message}
                  </p>
                  <div className="border-t border-ink/15 pt-2">
                    <p className="font-display text-sm text-ink">— {m.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {messages.length === 0 && (
          <p className="mt-10 text-center font-serif italic text-vintage">
            Jadilah yang pertama meninggalkan pesan ✨
          </p>
        )}
      </div>
    </section>
  );
}
