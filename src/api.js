const API = import.meta.env.VITE_API_URL;

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function login(username, password) {
  const r = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  if (!r.ok) throw new Error("Неверные данные");
  return r.json(); // { token }
}

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/admin";
}

export async function adminList() {
  const r = await fetch(`${API}/api/admin/products`, { headers: { ...authHeaders() } });
  if (!r.ok) throw new Error("Ошибка загрузки");
  return r.json();
}

export async function createProduct(payload) {
  const r = await fetch(`${API}/api/admin/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(payload)
  });
  if (!r.ok) throw new Error("Ошибка создания");
  return r.json();
}

export async function updateStatus(id, status) {
  const r = await fetch(`${API}/api/admin/products/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ status })
  });
  if (!r.ok) throw new Error("Ошибка статуса");
  return r.json();
}

export async function updateProduct(id, payload) {
  const r = await fetch(`${API}/api/admin/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(payload)
  });
  if (!r.ok) throw new Error("Ошибка обновления");
  return r.json();
}

export async function uploadImages(fileList) {
  const fd = new FormData();
  Array.from(fileList).forEach(f => fd.append("files", f));
  const r = await fetch(`${API}/api/admin/upload`, {
    method: "POST",
    headers: { ...authHeaders() }, // ВАЖНО: НЕ ставим Content-Type вручную
    body: fd
  });
  if (!r.ok) throw new Error("Ошибка загрузки изображений");
  return r.json(); // { urls: [] }
}

export async function listProducts(params = {}) {
  const qs = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([_,v]) => v !== undefined && v !== ""))
  ).toString();
  const r = await fetch(`${API}/api/products${qs ? `?${qs}` : ""}`);
  if (!r.ok) throw new Error("Не удалось загрузить каталог");
  return r.json(); // { items, total, page, pageSize }
}

export async function getProduct(idOrSlug) {
  const r = await fetch(`${API}/api/products/${idOrSlug}`);
  if (!r.ok) throw new Error("Товар не найден");
  return r.json();
}

export async function getFiltersMeta(type) {
  const qs = type ? `?type=${encodeURIComponent(type)}` : "";
  const r = await fetch(`${API}/api/filters/meta${qs}`);
  if (!r.ok) throw new Error("Не удалось загрузить фильтры");
  return r.json(); // { brands: string[], yearRange: {min,max} }
}