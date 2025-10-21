export default function ProductTable({ items, onPublish, onArchive, onDraft, onEdit }) {
  const fmtPrice = (p) => {
    if (!p.price) return "—";
    const n = Number(p.price);
    if (!Number.isFinite(n)) return `${p.price} ${p.currency || "EUR"}`;
    return new Intl.NumberFormat("ru-RU", { style: "currency", currency: p.currency || "EUR" }).format(n);
  };

  const statusPill = (s) => {
    const base = "px-2 py-1 rounded-full text-xs border backdrop-blur";
    const map = {
      PUBLISHED: `${base} border-emerald-400/40 text-emerald-300 bg-emerald-400/10`,
      DRAFT:     `${base} border-amber-400/40 text-amber-200 bg-amber-400/10`,
      ARCHIVED:  `${base} border-neutral-400/40 text-neutral-300 bg-neutral-400/10`,
    };
    return <span className={map[s] || `${base} border-white/20 text-white/80 bg-white/5`}>{s}</span>;
  };

  const actionBtn = (cls, label, onClick) => (
    <button
      onClick={onClick}
      className={`px-2.5 py-1.5 rounded-lg border text-xs transition hover:shadow ${cls} focus:outline-none focus:ring-2`}
    >
      {label}
    </button>
  );

  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="bg-white/10 backdrop-blur text-white/80 uppercase text-xs tracking-wide">
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">Название</th>
              <th className="px-3 py-2">Тип</th>
              <th className="px-3 py-2">Статус</th>
              <th className="px-3 py-2 text-right">Цена</th>
              <th className="px-3 py-2">Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p, i) => (
              <tr
                key={p.id}
                className={`
                  border-t border-white/10
                  ${i % 2 ? "bg-white/[0.04]" : "bg-transparent"}
                  hover:bg-white/[0.08] transition
                `}
              >
                <td className="px-3 py-2 text-white/80">{p.id}</td>
                <td className="px-3 py-2">
                  <div className="font-medium text-white line-clamp-1">{p.title}</div>
                  <div className="text-white/60 text-xs">{p.brand} {p.model}</div>
                </td>
                <td className="px-3 py-2 text-center text-white/80">{p.type}</td>
                <td className="px-3 py-2 text-center">{statusPill(p.status)}</td>
                <td className="px-3 py-2 text-right text-white">{fmtPrice(p)}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center justify-center gap-2">
                    {actionBtn(
                      "border-cyan-400/50 text-cyan-200 hover:bg-cyan-400/10 focus:ring-cyan-400/40",
                      "Ред.",
                      () => onEdit(p)
                    )}
                    {actionBtn(
                      "border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 focus:ring-[#FFD700]/40",
                      "Публ.",
                      () => onPublish(p.id)
                    )}
                    {actionBtn(
                      "border-amber-400/60 text-amber-200 hover:bg-amber-400/10 focus:ring-amber-400/40",
                      "Черн.",
                      () => onDraft(p.id)
                    )}
                    {actionBtn(
                      "border-red-500/70 text-red-300 hover:bg-red-500/10 focus:ring-red-500/40",
                      "Архив",
                      () => onArchive(p.id)
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {!items.length && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-white/70">
                  Нет товаров
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* нижний акцент */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
    </div>
  );
}