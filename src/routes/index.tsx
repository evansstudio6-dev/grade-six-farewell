import { createFileRoute } from "@tanstack/react-router";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CustomCursor } from "@/components/CustomCursor";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Gallery } from "@/components/Gallery";
import { Quotes } from "@/components/Quotes";
import { Goodbye } from "@/components/Goodbye";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Grade 6 — Have Been Completed | Digital Yearbook" },
      {
        name: "description",
        content:
          "A cinematic digital yearbook for the Class of 2026. Memories, voices, and the soundtrack of six years together.",
      },
      { property: "og:title", content: "Grade 6 — Have Been Completed" },
      { property: "og:description", content: "A nostalgic digital yearbook for the Class of 2026." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;1,400;1,500&family=Poppins:wght@300;400;500;600&display=swap",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="grain relative min-h-screen bg-background text-foreground">
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      <main>
        <Hero />
        <Journey />
        <Gallery />
        <Quotes />
        <Goodbye />
      </main>
    </div>
  );
}
