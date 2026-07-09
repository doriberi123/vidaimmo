export function VidaMark({ className }: { className?: string }) {
  return (
    <img
      src="/vida-mark.svg"
      alt="Vida Immobilien Wappen"
      className={`object-contain ${className ?? ""}`}
    />
  );
}
