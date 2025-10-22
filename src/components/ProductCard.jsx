import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const cover = product.images?.[0]?.url;
  const price = product.price
    ? formatPrice(product.price, product.currency)
    : "По запросу";
  const sub = [product.brand, product.model, product.year].filter(Boolean).join(" · ");

  return (
    <Link
      to={`/product/${product.slug || product.id}`}
      className="
        group relative block rounded-2xl overflow-hidden
        bg-white/10 backdrop-blur-md ring-1 ring-white/10
        transition
        hover:-translate-y-0.5 hover:ring-[#FFD700] hover:shadow-[0_8px_30px_rgba(0,0,0,0.45)]
        focus:outline-none focus:ring-2 focus:ring-[#FFD700]/70
      "
    >
      {/* медленный мягкий блик при hover */}
      <span
        className="
          pointer-events-none absolute inset-0 opacity-0
          bg-gradient-to-br from-white/10 via-transparent to-[#FFD700]/10
          transition-opacity duration-300
          group-hover:opacity-100
        "
      />

      {/* Обложка */}
      <div className="relative aspect-video overflow-hidden bg-[#333333]">
        {cover ? (
          <img
            src={cover}
            alt={product.title}
            className="
              w-full h-full object-cover
              transition-transform duration-500
              group-hover:scale-105
            "
            loading="lazy"
          />
        ) : null}

        {/* Бейдж цены */}
        <div
          className="
            absolute top-3 left-3
            rounded-lg px-2.5 py-1.5 text-sm
            bg-[#333333]/80 text-[#FFD700] border border-[#FFD700]/40
            backdrop-blur
            shadow-[0_4px_12px_rgba(0,0,0,0.35)]
          "
        >
          {price}
        </div>
      </div>

      {/* Контент */}
      <div className="relative p-4">
        <div className="text-xs md:text-sm text-white/70 mb-1">{sub}</div>
        <h3 className="text-white font-semibold leading-snug line-clamp-2">
          {product.title}
        </h3>

        <div className="mt-2 text-sm text-white/70 flex items-center gap-2">
          <span>Наработка</span>
          <span>{product.hours ?? "—"} м/ч</span>
        </div>

        {/* нижний акцент при hover */}
        <span
          className="
            pointer-events-none absolute left-0 right-0 bottom-0 h-[2px]
            bg-gradient-to-r from-transparent via-[#FFD700] to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
          "
        />
      </div>
    </Link>
  );
}

function humanType(t) {
  if (t === "HARVESTER") return "Харвестер";
  if (t === "FORWARDER") return "Форвардер";
  if (t === "HARVESTER_HEAD") return "Харвестерная голова";
  return t;
}

function formatPrice(v, curr = "EUR") {
  const n = Number(v);
  if (Number.isFinite(n)) {
    return new Intl.NumberFormat("ru-RU", { style: "currency", currency: curr }).format(n);
  }
  return `${v} ${curr}`;
}