"use client";

import React, { useEffect, useState } from "react";
import { CustomInputProps } from "@premieroctet/next-admin";

interface Variant {
  id: string;
  productId: string;
  size: string;
  taste: string;
  priceRetail: number;
  priceWholesale: number;
  minOrderWholesale: number;
  imageUrl: string | null;
}

export default function VariantManager({ name, value, onChange, disabled, readonly }: CustomInputProps) {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [loading, setLoading] = useState(true);
  const [productId, setProductId] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);

  // Sync state to parent Next Admin form
  useEffect(() => {
    if (!loading && onChange) {
      onChange({
        target: {
          name,
          value: JSON.stringify(variants),
        },
      } as any);
    }
  }, [variants, loading, name, onChange]);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingVariant, setEditingVariant] = useState<Variant | null>(null);
  
  // Form State
  const [size, setSize] = useState("");
  const [taste, setTaste] = useState("");
  const [priceRetail, setPriceRetail] = useState("");
  const [priceWholesale, setPriceWholesale] = useState("");
  const [minOrderWholesale, setMinOrderWholesale] = useState("12");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  // Image Upload State
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathParts = window.location.pathname.split("/");
      const lastPart = pathParts[pathParts.length - 1];
      const isNewProd = lastPart === "new" || !lastPart;
      setIsNew(isNewProd);
      
      if (!isNewProd) {
        setProductId(lastPart);
        fetchVariants(lastPart);
      } else {
        setLoading(false);
      }
    }
  }, []);

  const fetchVariants = async (prodId: string) => {
    try {
      const res = await fetch(`/api/admin/variants?productId=${prodId}`);
      if (res.ok) {
        const data = await res.json();
        setVariants(data);
      }
    } catch (err) {
      console.error("Failed to load variants:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditingVariant(null);
    setSize("");
    setTaste("");
    setPriceRetail("");
    setPriceWholesale("");
    setMinOrderWholesale("12");
    setImageUrl(null);
    setShowModal(true);
  };

  const handleOpenEditModal = (variant: Variant) => {
    setEditingVariant(variant);
    setSize(variant.size);
    setTaste(variant.taste);
    setPriceRetail(variant.priceRetail.toString());
    setPriceWholesale(variant.priceWholesale.toString());
    setMinOrderWholesale(variant.minOrderWholesale.toString());
    setImageUrl(variant.imageUrl);
    setShowModal(true);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    // Convert file to base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ base64: base64String }),
        });

        if (res.ok) {
          const data = await res.json();
          setImageUrl(data.imageUrl);
        } else {
          alert("Gagal mengunggah gambar. Silakan coba lagi.");
        }
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat mengunggah gambar.");
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveVariant = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!size || !taste || !priceRetail || !priceWholesale) {
      alert("Harap isi semua kolom wajib.");
      return;
    }

    const newOrUpdatedVariant: Variant = {
      id: editingVariant?.id || `temp-${Date.now()}-${Math.random()}`,
      productId: productId || "",
      size,
      taste,
      priceRetail: Number(priceRetail),
      priceWholesale: Number(priceWholesale),
      minOrderWholesale: Number(minOrderWholesale),
      imageUrl,
    };

    if (editingVariant) {
      setVariants((prev) =>
        prev.map((v) => (v.id === editingVariant.id ? newOrUpdatedVariant : v))
      );
    } else {
      setVariants((prev) => [...prev, newOrUpdatedVariant]);
    }
    setShowModal(false);
  };

  const handleDeleteVariant = (variantId: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus varian produk ini?")) return;
    setVariants((prev) => prev.filter((v) => v.id !== variantId));
  };

  // isNew check removed to allow adding variants directly during product creation

  if (loading) {
    return <div className="text-sm text-gray-500 animate-pulse">Memuat data varian produk...</div>;
  }

  return (
    <div className="space-y-4 w-full">
      <input type="hidden" name={name} value={JSON.stringify(variants)} />
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Daftar Varian Produk ({variants.length})
        </h3>
        {!disabled && !readonly && (
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="rounded-md bg-indigo-600 dark:bg-indigo-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
          >
            + Tambah Varian
          </button>
        )}
      </div>

      {variants.length === 0 ? (
        <div className="rounded-md border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-950">
          Belum ada varian produk. Klik tombol "+ Tambah Varian" untuk membuat varian pertama.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-slate-900 text-left text-sm">
            <thead className="bg-gray-50 dark:bg-slate-950 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">Gambar</th>
                <th className="px-4 py-3">Ukuran / Berat</th>
                <th className="px-4 py-3">Rasa / Varian</th>
                <th className="px-4 py-3">Harga Eceran</th>
                <th className="px-4 py-3">Harga Grosir</th>
                <th className="px-4 py-3">Min. Grosir</th>
                {!disabled && !readonly && <th className="px-4 py-3 text-right">Aksi</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
              {variants.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3">
                    {v.imageUrl ? (
                      <img
                        src={v.imageUrl}
                        alt={`${v.size} ${v.taste}`}
                        className="h-10 w-10 rounded object-cover border border-gray-200 dark:border-gray-700 bg-gray-100"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{v.size}</td>
                  <td className="px-4 py-3">{v.taste}</td>
                  <td className="px-4 py-3">Rp {v.priceRetail.toLocaleString("id-ID")}</td>
                  <td className="px-4 py-3">Rp {v.priceWholesale.toLocaleString("id-ID")}</td>
                  <td className="px-4 py-3">{v.minOrderWholesale} pcs</td>
                  {!disabled && !readonly && (
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(v)}
                        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteVariant(v.id)}
                        className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline"
                      >
                        Hapus
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Dialog Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-gray-200 dark:border-gray-800 transform transition-all animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              {editingVariant ? "Edit Varian Produk" : "Tambah Varian Baru"}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                  Ukuran / Berat <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 100g, 250g, 500g"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                  Rasa / Varian <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pedas Daun Jeruk, Original, Balado"
                  value={taste}
                  onChange={(e) => setTaste(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    Harga Eceran (Rp) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Contoh: 12000"
                    value={priceRetail}
                    onChange={(e) => setPriceRetail(e.target.value)}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    Harga Grosir (Rp) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Contoh: 10000"
                    value={priceWholesale}
                    onChange={(e) => setPriceWholesale(e.target.value)}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                  Min. Order Grosir (Pcs) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  placeholder="12"
                  value={minOrderWholesale}
                  onChange={(e) => setMinOrderWholesale(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                  Gambar Varian
                </label>
                <div className="mt-1 flex items-center gap-4">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="h-16 w-16 rounded object-cover border border-gray-300 dark:border-gray-700 bg-gray-100"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-slate-950 flex items-center justify-center text-xs text-gray-400">
                      No Image
                    </div>
                  )}
                  
                  <div className="flex-grow">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={uploading}
                      className="block w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-950/30 dark:file:text-indigo-400 cursor-pointer disabled:opacity-50"
                    />
                    {uploading && <p className="text-[11px] text-indigo-600 mt-1 animate-pulse">Mengunggah dan mengompres...</p>}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-150 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveVariant()}
                  disabled={uploading}
                  className="rounded-md bg-indigo-600 dark:bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-indigo-400 disabled:opacity-50 transition-colors"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
