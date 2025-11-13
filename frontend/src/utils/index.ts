export function formatDate(isoString?: string | number | Date): string {
  if (!isoString) return "—";

  const date = isoString instanceof Date 
  ? isoString 
  : new Date(typeof isoString === 'number' ? (isoString < 1e12 ? isoString * 1000 : isoString) : isoString)


  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}