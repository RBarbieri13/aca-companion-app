"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea, Input } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/app-store";
import { TRAITS } from "@/data/traits";
import { Zap, CheckCircle2 } from "lucide-react";

export function TriggerLogView() {
  const logs = useAppStore((s) => s.triggers);
  const logTrigger = useAppStore((s) => s.logTrigger);

  const [event, setEvent] = useState("");
  const [traitId, setTraitId] = useState<number | undefined>(undefined);
  const [response, setResponse] = useState("");
  const [desired, setDesired] = useState("");
  const [saved, setSaved] = useState(false);

  const canSave = event.trim().length > 0;

  return (
    <div>
      <Card className="p-6 md:p-8 mb-6 bg-[var(--muted)]/30">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-4 w-4 text-[var(--accent)]" strokeWidth={1.75} />
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            How to practice
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          When you notice a trigger — or after one has passed — capture it quickly here. What
          happened, which trait showed up, how you actually responded, and how you&apos;d
          like to respond next time. Patterns become visible over weeks.
        </p>
      </Card>

      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 gap-4">
          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              What happened?
            </div>
            <Input
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              placeholder="Boss criticized my report in the meeting"
            />
          </label>

          <label>
            <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
              Which trait showed up?
            </div>
            <select
              value={traitId ?? ""}
              onChange={(e) => setTraitId(e.target.value ? Number(e.target.value) : undefined)}
              className="h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm"
            >
              <option value="">— optional —</option>
              {TRAITS.map((t) => (
                <option key={t.id} value={t.id}>
                  Trait {t.id}: {t.shortName}
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label>
              <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1.5">
                How did I respond?
              </div>
              <Textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                rows={4}
                placeholder="Went quiet, started over-explaining..."
              />
            </label>
            <label>
              <div className="text-xs uppercase tracking-wider text-[var(--primary)] font-semibold mb-1.5">
                How do I want to respond next time?
              </div>
              <Textarea
                value={desired}
                onChange={(e) => setDesired(e.target.value)}
                rows={4}
                placeholder="Pause, breathe, ask one clarifying question..."
              />
            </label>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            disabled={!canSave}
            onClick={() => {
              logTrigger({ event, traitId, response, desiredResponse: desired });
              setEvent("");
              setTraitId(undefined);
              setResponse("");
              setDesired("");
              setSaved(true);
              setTimeout(() => setSaved(false), 1500);
            }}
          >
            {saved ? (
              <>
                <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                Logged
              </>
            ) : (
              "Log trigger"
            )}
          </Button>
        </div>
      </Card>

      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="font-serif text-xl font-semibold">Past logs</h2>
        <span className="text-xs text-[var(--muted-foreground)]">{logs.length} logged</span>
      </div>
      {logs.length === 0 ? (
        <Card className="p-8 text-center text-sm text-[var(--muted-foreground)]">
          No triggers logged yet.
        </Card>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => {
            const t = log.traitId ? TRAITS.find((x) => x.id === log.traitId) : null;
            return (
              <Card key={log.id} className="p-5">
                <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                  <div className="font-serif text-base font-semibold leading-snug">
                    {log.event}
                  </div>
                  <Badge variant="muted" className="text-[10px]">
                    {new Date(log.timestamp).toLocaleDateString([], {
                      month: "short",
                      day: "numeric",
                    })}
                  </Badge>
                </div>
                {t && (
                  <Badge variant="outline" className="text-[10px] mb-3">
                    Trait {t.id} · {t.shortName}
                  </Badge>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-sm">
                  {log.response && (
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-1">
                        Response
                      </div>
                      <p className="text-[var(--foreground)]/90 leading-relaxed">{log.response}</p>
                    </div>
                  )}
                  {log.desiredResponse && (
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[var(--primary)] font-semibold mb-1">
                        Desired response
                      </div>
                      <p className="text-[var(--foreground)]/90 leading-relaxed">
                        {log.desiredResponse}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
