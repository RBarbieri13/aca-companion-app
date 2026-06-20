"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/app-store";
import type { IdentityCategory } from "@/lib/types";
import { Compass, Plus, Trash2, Check, Pencil, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryMeta {
  id: IdentityCategory;
  label: string;
  short: string;
  description: string;
  placeholder: string;
  color: string;
}

const CATEGORIES: CategoryMeta[] = [
  {
    id: "values",
    label: "Values",
    short: "What actually matters to me",
    description:
      "What actually matters to you — not what you were told should matter. What do you want to be in the world, regardless of whether it earns anyone's approval?",
    placeholder:
      "Honesty, even when it costs me. The right to rest. Creative time that isn't 'productive'...",
    color: "var(--primary)",
  },
  {
    id: "strengths",
    label: "Strengths",
    short: "What I recognize in myself",
    description:
      "Qualities you've seen in yourself across time — not the ones other people praise, the ones you quietly know are true.",
    placeholder:
      "I can sit with difficult feelings without running. I'm a careful reader of people...",
    color: "var(--sage)",
  },
  {
    id: "enjoy",
    label: "What I Enjoy",
    short: "Pleasure, not performance",
    description:
      "Things you genuinely enjoy — separated from what's impressive, respectable, or useful. What makes you slow down on purpose?",
    placeholder:
      "Old maps. Cold water on my face. Noticing the light change. Cooking for one...",
    color: "var(--accent)",
  },
  {
    id: "rolesVsSelf",
    label: "Roles vs. Self",
    short: "The costume vs. the person",
    description:
      "Roles you play (partner, parent, employee, helper, peacemaker, caretaker) and what you actually are underneath the role. Write both.",
    placeholder:
      "Role: the competent one at work.  Underneath: someone who is often tired and careful not to seem tired...",
    color: "#8B7BA8",
  },
  {
    id: "knownInternally",
    label: "Known from Within",
    short: "Things no one taught me about me",
    description:
      "Truths about yourself that came from inside — not from a diagnosis, a parent, a partner, a test. You just know.",
    placeholder:
      "I know I am here. I know what fits and what doesn't. I know when I'm lying to myself...",
    color: "#D4A84B",
  },
];

export function IdentityInventory() {
  const entries = useAppStore((s) => s.identity);
  const addEntry = useAppStore((s) => s.addIdentityEntry);
  const updateEntry = useAppStore((s) => s.updateIdentityEntry);
  const deleteEntry = useAppStore((s) => s.deleteIdentityEntry);

  const [activeCategory, setActiveCategory] = useState<IdentityCategory>("values");
  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState("");
  const [justSaved, setJustSaved] = useState(false);

  const active = CATEGORIES.find((c) => c.id === activeCategory)!;
  const entriesForCategory = entries.filter((e) => e.category === activeCategory);
  const totalByCategory = CATEGORIES.map((c) => ({
    ...c,
    count: entries.filter((e) => e.category === c.id).length,
  }));
  const grandTotal = entries.length;

  const submit = () => {
    if (!draft.trim()) return;
    addEntry(activeCategory, draft.trim());
    setDraft("");
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1200);
  };

  return (
    <div>
      <Card className="p-5 md:p-6 mb-6 bg-[var(--muted)]/30">
        <div className="flex items-center gap-2 mb-2">
          <Compass className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            What is this
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--foreground)]/80 max-w-3xl">
          A slow, self-authored inventory of who you are — built over weeks, not minutes. Return to it
          often. Add things. Cross things out when they no longer fit. This is how the Flip Side of
          Trait 2 happens in practice: <em>we do not depend on others to tell us who we are.</em>
        </p>
      </Card>

      {/* Category selector */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
        {totalByCategory.map((c) => {
          const isActive = c.id === activeCategory;
          return (
            <button
              key={c.id}
              onClick={() => {
                setActiveCategory(c.id);
                setDraft("");
                setEditingId(null);
              }}
              className={cn(
                "text-left rounded-xl border p-3 transition-all",
                isActive
                  ? "border-[var(--primary)] bg-[var(--card)] shadow-sm"
                  : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/30"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ background: c.color }}
                />
                <span className="text-[10px] font-semibold text-[var(--muted-foreground)]">
                  {c.count}
                </span>
              </div>
              <div className="font-serif text-sm font-semibold text-[var(--foreground)] leading-tight mb-0.5">
                {c.label}
              </div>
              <div className="text-[10px] text-[var(--muted-foreground)] leading-snug">
                {c.short}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active category — add + list */}
      <Card className="p-6 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: active.color }}
          />
          <h2 className="font-serif text-xl font-semibold" style={{ color: active.color }}>
            {active.label}
          </h2>
        </div>
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-3xl mb-4">
          {active.description}
        </p>

        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={active.placeholder}
          rows={4}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault();
              submit();
            }
          }}
          className="journal-input"
        />
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] text-[var(--muted-foreground)]">
            Tip: add one thought at a time. ⌘ + Enter to save.
          </span>
          <Button onClick={submit} disabled={!draft.trim()}>
            {justSaved ? (
              <>
                <Check className="h-4 w-4" strokeWidth={2} />
                Added
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" strokeWidth={2} />
                Add to {active.label}
              </>
            )}
          </Button>
        </div>
      </Card>

      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="font-serif text-lg font-semibold">
          {active.label} · {entriesForCategory.length}
        </h3>
        <span className="text-xs text-[var(--muted-foreground)]">
          {grandTotal} total across all categories
        </span>
      </div>

      {entriesForCategory.length === 0 ? (
        <Card className="p-8 text-center text-sm text-[var(--muted-foreground)]">
          Nothing here yet. Start with one thing you know.
        </Card>
      ) : (
        <div className="space-y-3">
          {entriesForCategory.map((entry) => {
            const isEditing = editingId === entry.id;
            return (
              <Card key={entry.id} className="p-5">
                {isEditing ? (
                  <div>
                    <Textarea
                      value={editDraft}
                      onChange={(e) => setEditDraft(e.target.value)}
                      rows={4}
                      className="journal-input mb-3"
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingId(null);
                          setEditDraft("");
                        }}
                      >
                        <X className="h-3 w-3" strokeWidth={2} />
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          if (editDraft.trim()) {
                            updateEntry(entry.id, editDraft.trim());
                          }
                          setEditingId(null);
                          setEditDraft("");
                        }}
                      >
                        <Check className="h-3 w-3" strokeWidth={2} />
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <Badge variant="muted" className="text-[10px]">
                        {new Date(entry.updatedAt).toLocaleDateString([], {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingId(entry.id);
                            setEditDraft(entry.content);
                          }}
                          className="p-1.5 rounded text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--muted)]"
                          aria-label="Edit"
                        >
                          <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
                        </button>
                        <button
                          onClick={() => deleteEntry(entry.id)}
                          className="p-1.5 rounded text-[var(--muted-foreground)] hover:text-[var(--accent)] hover:bg-[var(--muted)]"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                        </button>
                      </div>
                    </div>
                    <p className="font-journal text-base leading-relaxed text-[var(--foreground)]/90 whitespace-pre-wrap">
                      {entry.content}
                    </p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
