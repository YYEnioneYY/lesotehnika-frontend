import { useEffect, useState } from "react";
import { adminList, updateStatus, createProduct, updateProduct, logout } from "../api";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";

export default function AdminPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);

  async function load() {
    try {
      setLoading(true);
      setItems(await adminList());
    } catch (e) {
      setError(e.message || "Ошибка");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function changeStatus(id, status) {
    try {
      await updateStatus(id, status);
      await load();
    } catch (e) {
      alert(e.message);
    }
  }

  async function onCreate(payload) {
    try {
      await createProduct(payload);
      setShowForm(false);
      await load();
    } catch (e) {
      alert(e.message);
    }
  }

  async function onUpdate(payload) {
    try {
      await updateProduct(editItem.id, payload);
      setEditItem(null);
      setShowForm(false);
      await load();
    } catch (e) {
      alert(e.message);
    }
  }

  const btnBase =
    "inline-flex items-center gap-2 px-4 py-2 rounded-xl transition focus:outline-none focus:ring-2";
  const btnPrimary =
    `${btnBase} border border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 focus:ring-[#FFD700]/40`;
  const btnDanger =
    `${btnBase} border border-red-500/70 text-red-300 hover:bg-red-500/10 focus:ring-red-500/40`;

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,_#0e0e0e,_#333333)] text-white">
      <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-24 py-10 space-y-8">

        {/* Панель управления */}
        <div className="rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/10 p-4 md:p-5 flex flex-wrap items-center justify-between gap-3 relative">
          <span className="text-xl font-semibold">Товары</span>
          <div className="flex items-center gap-3">
            <button
              className={btnPrimary}
              onClick={() => { setEditItem(null); setShowForm(true); }}
            >
              <span>＋</span> Новый товар
            </button>
            <button
              onClick={() => { logout(); }}
              className={btnDanger}
            >
              Выйти
            </button>
          </div>
          <span className="pointer-events-none absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
        </div>

        {/* Контент */}
        {loading && (
          <div className="rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/10 p-6">
            Загрузка…
          </div>
        )}

        {error && (
          <div className="rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/10 p-6 text-red-300">
            {error}
          </div>
        )}

        {!loading && !showForm && (
          <ProductTable
            items={items}
            onPublish={(id)=>changeStatus(id,"PUBLISHED")}
            onArchive={(id)=>changeStatus(id,"ARCHIVED")}
            onDraft={(id)=>changeStatus(id,"DRAFT")}
            onEdit={(p)=>{ setEditItem(p); setShowForm(true); }}
          />
        )}

        {showForm && (
          <div className="rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/10 p-4 md:p-6">
            <ProductForm
              initial={editItem || undefined}
              onSubmit={editItem ? onUpdate : onCreate}
              onCancel={()=>{ setShowForm(false); setEditItem(null); }}
            />
          </div>
        )}
      </div>
    </div>
  );
}