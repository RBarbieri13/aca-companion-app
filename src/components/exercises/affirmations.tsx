"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AFFIRMATIONS } from "@/data/affirmations";
import { useAppStore } from "@/store/app-store";
import { Heart, Shuffle, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function AffirmationsView() {
  const [index, setIndex] = useState(0);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const favorites = useAppStore((s) => s.favoriteAffirmations);
  const toggleFavorite = useAppStore((s) => s.toggleFavoriteAffirmation);

  const pool = showFavoritesOnly ? favorites : AFFIRMATIONS;
  const safeIndex = pool.length > 0 ? index % pool.length : 0;
  const current = pool[safeIndex];
  const isFav = current ? favorites.includes(current) : false;

  const next = () => setIndex((i) => (pool.length > 0 ? (i + 1) % pool.length : 0));
  const prev = () =>
    setIndex((i) => (pool.length > 0 ? (i - 1 + pool.length) % pool.length : 0));
  const shuffle = () => {
    if (pool.length <= 1) return;
    let r = Math.floor(Math.random() * pool.length);
    if (r === safeIndex) r = (r + 1) % pool.length;
    setIndex(r);
  };

  return (
    <div>
      <Card className="p-6 md:p-8 mb-6 bg-[var(--muted)]/30">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="h-4 w-4 text-[var(--accent)]" strokeWidth={1.75} />
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            How to use
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          Sit with one affirmation for a few breaths. Read it slowly, twice. Notice what
          resists. Favorite the ones that land — they&apos;ll be here for you on harder days.
        </p>
      </Card>

      <div className="flex items-center gap-2 mb-4">
        <Button
          variant={showFavoritesOnly ? "default" : "outline"}
          size="sm"
          onClick={() => {
            setShowFavoritesOnly(false);
            setIndex(0);
          }}
        >
          All ({AFFIRMATIONS.length})
        </Button>
        <Button
          variant={showFavoritesOnly ? "default" : "outline"}
          size="sm"
          onClick={() => {
            setShowFavoritesOnly(true);
            setIndex(0);
          }}
          disabled={favorites.length === 0}
        >
          <Heart className="h-3.5 w-3.5" strokeWidth={2} />
          Favorites ({favorites.length})
        </Button>
      </div>

      {current ? (
        <Card className="p-10 md:p-16 mb-6 bg-gradient-to-br from-[var(--card)] to-[var(--muted)]/50 text-center min-h-[280px] flex flex-col justify-center">
          <p className="font-serif text-2xl md:text-4xl font-normal italic leading-snug text-[var(--foreground)] max-w-2xl mx-auto">
            &ldquo;{current}&rdquo;
          </p>
          <button
            onClick={() => toggleFavorite(current)}
            className={cn(
              "mx-auto mt-8 flex items-center gap-2 text-sm rounded-full border px-4 py-2 transition-colors",
              isFav
                ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                : "border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
            )}
          >
            <Heart className={cn("h-4 w-4", isFav && "fill-[var(--accent)]")} strokeWidth={1.75} />
            {isFav ? "Favorited" : "Favorite this"}
          </button>
        </Card>
      ) : (
        <Card className="p-10 mb-6 text-center text-sm text-[var(--muted-foreground)]">
          No favorites yet. Favorite some from the All list first.
        </Card>
      )}

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={prev} disabled={pool.length === 0}>
          <ChevronLeft className="h-4 w-4" strokeWidth={2} />
          Previous
        </Button>
        <Button variant="ghost" onClick={shuffle} disabled={pool.length <= 1}>
          <Shuffle className="h-4 w-4" strokeWidth={1.75} />
          Shuffle
        </Button>
        <Button variant="outline" onClick={next} disabled={pool.length === 0}>
          Next
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
}
