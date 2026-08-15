"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/textarea";
import { useAppStore } from "@/store/app-store";
import { Heart, LifeBuoy, Plus, Trash2 } from "lucide-react";

const STARTER_LOVE = [
  "Asking what they actually need",
  "Listening without fixing",
  "Respecting their no",
  "Telling the truth kindly",
  "Letting them do what they can do",
];

const STARTER_PITY = [
  "Helping before being asked",
  "Doing for them what they can do",
  "Feeling sorry from above",
  "Keeping them dependent on me",
  "Rescuing to feel needed",
];

export function LovePityLedgerView() {
  const items = useAppStore((s) => s.loveActions);
  const addItem = useAppStore((s) => s.addLoveAction);
  const deleteItem = useAppStore((s) => s.deleteLoveAction);

  const loves = useMemo(() => items.filter((i) => i.kind === "love"), [items]);
  const pities = useMemo(() => items.filter((i) => i.kind === "pity"), [items]);

  const [loveInput, setLoveInput] = useState("");
  const [pityInput, setPityInput] = useState("");

  const usedLoveTexts = new Set(loves.map((i) => i.text.toLowerCase()));
  const usedPityTexts = new Set(pities.map((i) => i.text.toLowerCase()));
  const remainingLoveStarters = STARTER_LOVE.filter((s) => !usedLoveTexts.has(s.toLowerCase()));
  const remainingPityStarters = STARTER_PITY.filter((s) => !usedPityTexts.has(s.toLowerCase()));

  return (
    <div>
      {/* How to practice */}
      <Card className="p-5 md:p-6 mb-6 bg-[var(--muted)]/30">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            How to practice
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl mb-2">
          The Flip Side of Trait 9: <em>we are able to distinguish love from pity, and do not
          think &ldquo;rescuing&rdquo; people we &ldquo;pity&rdquo; is an act of love.</em> The
          workbook asks: <em>can you list actions coming from love?</em> For most of us the two
          were fused for so long that we have to take them apart by hand, one action at a time.
        </p>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          This is a living ledger, not a quiz. Add to either column as real moments show you the
          difference — the naming itself is the practice.
        </p>
      </Card>

      {/* Two-column ledger */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Love column */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="h-4 w-4 text-[var(--sage)]" strokeWidth={2} />
            <h4 className="font-serif text-base font-semibold text-[var(--sage)]">
              Actions coming from love
            </h4>
            <span className="ml-auto text-xs text-[var(--muted-foreground)]">{loves.length}</span>
          </div>

          <div className="space-y-2 mb-3">
            {loves.map((i) => (
              <div
                key={i.id}
                className="flex items-center gap-2 rounded-lg border border-[var(--sage)]/30 bg-[var(--sage)]/[0.06] px-3 py-2"
              >
                <span className="flex-1 text-sm text-[var(--foreground)]/90">{i.text}</span>
                <button
                  onClick={() => deleteItem(i.id)}
                  className="text-[var(--muted-foreground)]/60 hover:text-[var(--accent)]"
                  aria-label="Remove love action"
                >
                  <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                </button>
              </div>
            ))}
            {loves.length === 0 && (
              <p className="text-xs text-[var(--muted-foreground)] italic">
                What does helping look like when it treats the other person as capable?
              </p>
            )}
          </div>

          <div className="flex gap-2 mb-3">
            <Input
              value={loveInput}
              onChange={(e) => setLoveInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addItem(loveInput, "love");
                  setLoveInput("");
                }
              }}
              placeholder="Add a love action…"
            />
            <Button
              variant="subtle"
              size="icon"
              onClick={() => {
                addItem(loveInput, "love");
                setLoveInput("");
              }}
              aria-label="Add love action"
            >
              <Plus className="h-4 w-4" strokeWidth={2} />
            </Button>
          </div>

          {remainingLoveStarters.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
                Tap to add
              </div>
              <div className="flex flex-wrap gap-1.5">
                {remainingLoveStarters.map((s) => (
                  <button
                    key={s}
                    onClick={() => addItem(s, "love")}
                    className="text-[11px] rounded-full border border-[var(--sage)]/40 bg-[var(--card)] px-2.5 py-1 text-[var(--foreground)]/75 hover:bg-[var(--sage)]/10 transition-colors"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Pity column */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <LifeBuoy className="h-4 w-4 text-[var(--accent)]" strokeWidth={2} />
            <h4 className="font-serif text-base font-semibold text-[var(--accent)]">
              Actions coming from pity / rescue
            </h4>
            <span className="ml-auto text-xs text-[var(--muted-foreground)]">{pities.length}</span>
          </div>

          <div className="space-y-2 mb-3">
            {pities.map((i) => (
              <div
                key={i.id}
                className="flex items-center gap-2 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/[0.06] px-3 py-2"
              >
                <span className="flex-1 text-sm text-[var(--foreground)]/90">{i.text}</span>
                <button
                  onClick={() => deleteItem(i.id)}
                  className="text-[var(--muted-foreground)]/60 hover:text-[var(--accent)]"
                  aria-label="Remove pity action"
                >
                  <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                </button>
              </div>
            ))}
            {pities.length === 0 && (
              <p className="text-xs text-[var(--muted-foreground)] italic">
                What does helping look like when the hidden payoff is yours?
              </p>
            )}
          </div>

          <div className="flex gap-2 mb-3">
            <Input
              value={pityInput}
              onChange={(e) => setPityInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addItem(pityInput, "pity");
                  setPityInput("");
                }
              }}
              placeholder="Add a pity / rescue action…"
            />
            <Button
              variant="subtle"
              size="icon"
              onClick={() => {
                addItem(pityInput, "pity");
                setPityInput("");
              }}
              aria-label="Add pity action"
            >
              <Plus className="h-4 w-4" strokeWidth={2} />
            </Button>
          </div>

          {remainingPityStarters.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
                Tap to add
              </div>
              <div className="flex flex-wrap gap-1.5">
                {remainingPityStarters.map((s) => (
                  <button
                    key={s}
                    onClick={() => addItem(s, "pity")}
                    className="text-[11px] rounded-full border border-[var(--accent)]/40 bg-[var(--card)] px-2.5 py-1 text-[var(--foreground)]/75 hover:bg-[var(--accent)]/10 transition-colors"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Contrast footer */}
      <Card className="p-5 md:p-6 text-center">
        <div className="flex items-center justify-center gap-6 mb-2">
          <div>
            <div className="font-serif text-2xl font-semibold text-[var(--sage)]">{loves.length}</div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
              from love
            </div>
          </div>
          <span className="text-[var(--border)] font-serif text-xl">·</span>
          <div>
            <div className="font-serif text-2xl font-semibold text-[var(--accent)]">{pities.length}</div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
              from pity
            </div>
          </div>
        </div>
        <p className="text-sm text-[var(--muted-foreground)] italic max-w-xl mx-auto">
          Love looks across at an equal. Pity looks down. Same helping hands — entirely different
          direction of gaze.
        </p>
      </Card>
    </div>
  );
}
