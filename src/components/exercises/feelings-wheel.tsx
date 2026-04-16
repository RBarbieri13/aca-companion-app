"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FEELING_WHEEL } from "@/data/feelings";
import { useAppStore } from "@/store/app-store";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

export function FeelingsWheel() {
  const [selected, setSelected] = useState<{ feeling: string; category: string; color: string } | null>(null);
  const [note, setNote] = useState("");
  const [justLogged, setJustLogged] = useState(false);
  const logFeeling = useAppStore((s) => s.logFeeling);
  const feelings = useAppStore((s) => s.feelings);

  return (
    <div>
      <Card className="p-6 md:p-8 mb-6 bg-[var(--muted)]/30">
        <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-2">
          How to practice
        </div>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          Pause and name what&apos;s here. Start with the outer family, then let yourself land on
          the more specific word. Add a line about what&apos;s underneath it if you can.
        </p>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 mb-8">
        <Card className="p-5">
          <div className="space-y-5">
            {FEELING_WHEEL.map((cat) => (
              <div key={cat.name}>
                <div
                  className="text-xs uppercase tracking-widest font-semibold mb-2"
                  style={{ color: cat.color }}
                >
                  {cat.name}
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.feelings.map((f) => {
                    const isSelected =
                      selected?.feeling === f && selected?.category === cat.name;
                    return (
                      <button
                        key={f}
                        onClick={() =>
                          setSelected({ feeling: f, category: cat.name, color: cat.color })
                        }
                        className={cn(
                          "px-3 py-1.5 rounded-full text-sm font-medium border transition-all",
                          isSelected
                            ? "text-white shadow-sm"
                            : "border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]"
                        )}
                        style={
                          isSelected
                            ? { background: cat.color, borderColor: cat.color }
                            : undefined
                        }
                      >
                        {f}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 h-fit lg:sticky lg:top-6">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-2">
            Log a feeling
          </div>
          {selected ? (
            <>
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ background: selected.color }}
                />
                <span className="font-serif text-2xl font-semibold">{selected.feeling}</span>
                <Badge variant="muted" className="text-[10px] ml-auto">
                  {selected.category}
                </Badge>
              </div>
              <label className="block mb-4">
                <div className="text-xs text-[var(--muted-foreground)] mb-1.5">
                  What&apos;s underneath it?
                </div>
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={4}
                  placeholder="Optional. A sentence or two..."
                  className="text-sm"
                />
              </label>
              <Button
                className="w-full"
                onClick={() => {
                  logFeeling(selected.feeling, selected.category, note);
                  setNote("");
                  setJustLogged(true);
                  setTimeout(() => setJustLogged(false), 1500);
                }}
              >
                {justLogged ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                    Logged
                  </>
                ) : (
                  "Log this feeling"
                )}
              </Button>
            </>
          ) : (
            <p className="text-sm text-[var(--muted-foreground)]">
              Select a feeling from the wheel to log it.
            </p>
          )}
        </Card>
      </div>

      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="font-serif text-xl font-semibold">Recent feelings</h2>
        <span className="text-xs text-[var(--muted-foreground)]">{feelings.length} logged</span>
      </div>
      {feelings.length === 0 ? (
        <Card className="p-8 text-center text-sm text-[var(--muted-foreground)]">
          Your logged feelings will show up here.
        </Card>
      ) : (
        <div className="space-y-2">
          {feelings.slice(0, 15).map((f) => (
            <Card key={f.id} className="p-4 flex items-start gap-4">
              <div className="text-xs text-[var(--muted-foreground)] font-medium w-20 shrink-0">
                {new Date(f.timestamp).toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                })}
                <div className="text-[10px] opacity-70">
                  {new Date(f.timestamp).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-serif text-base font-semibold">{f.feeling}</span>
                  <Badge variant="muted" className="text-[10px]">
                    {f.category}
                  </Badge>
                </div>
                {f.note && (
                  <p className="text-sm text-[var(--muted-foreground)] leading-snug font-journal">
                    {f.note}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
