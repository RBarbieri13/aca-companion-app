import { TraitsHub } from "@/components/traits-hub";

export default function TraitsPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-2">
          The Laundry List Workbook
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[var(--foreground)] mb-3">
          The 14 Traits
        </h1>
        <p className="text-[var(--muted-foreground)] text-base max-w-2xl">
          Each trait is studied over two Saturday sessions — one for the Main List, one for the
          Flip Side. We&apos;re building this together, one week at a time.
        </p>
      </div>
      <TraitsHub />
    </div>
  );
}
