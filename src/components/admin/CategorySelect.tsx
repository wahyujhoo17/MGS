"use client";

import React, { useEffect, useState, useRef } from "react";
import { CustomInputProps } from "@premieroctet/next-admin";

export default function CategorySelect({ name, value, onChange, disabled, readonly }: CustomInputProps) {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [savingCat, setSavingCat] = useState(false);

  // Search Select States
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract selected ID
  const selectedId = typeof value === "object" && value !== null ? ((value as any).id || "") : (value || "");

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load categories:", err);
        setLoading(false);
      });
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    setSavingCat(true);

    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCatName }),
      });
      if (res.ok) {
        const newCat = await res.json();
        setCategories((prev) => [...prev, newCat]);
        setNewCatName("");
        setShowForm(false);

        // Auto select the new category
        if (onChange) {
          onChange({
            target: {
              name: name,
              value: newCat.id,
            },
          } as any);
        }
      } else {
        const errData = await res.json();
        alert(`Gagal membuat kategori: ${errData.error || "Server error"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan kategori.");
    } finally {
      setSavingCat(false);
    }
  };

  const selectedCategory = categories.find((cat) => cat.id === selectedId);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="text-sm text-gray-500 animate-pulse">Memuat daftar kategori...</div>;
  }

  return (
    <div className="space-y-3 w-full" ref={containerRef}>
      <input type="hidden" name={name} value={selectedId} />
      
      <div className="flex items-center gap-2">
        {/* Custom Search Select Dropdown matching Next Admin */}
        <div className="relative flex-grow">
          <button
            type="button"
            disabled={disabled || readonly}
            onClick={() => setIsOpen(!isOpen)}
            className="ring-nextadmin-border-default dark:ring-dark-nextadmin-border-strong dark:bg-dark-nextadmin-background-subtle flex w-full cursor-default justify-between items-center rounded-md px-3 py-2 text-sm placeholder-gray-500 shadow-sm ring-1 disabled:opacity-50 text-left h-9"
          >
            <span className="text-nextadmin-content-inverted dark:text-dark-nextadmin-content-inverted bg-transparent focus:outline-none flex-grow truncate">
              {selectedCategory ? selectedCategory.name : "-- Pilih Kategori --"}
            </span>
            <span className="flex items-center ml-2">
              <svg
                className="h-4 w-4 text-gray-400"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </span>
          </button>

          {isOpen && (
            <div className="bg-nextadmin-background-default dark:bg-dark-nextadmin-background-emphasis ring-nextadmin-border-default dark:ring-dark-nextadmin-border-strong absolute z-25 mt-1 max-h-60 w-full overflow-auto rounded-md shadow-2xl ring-1">
              {/* Search input inside dropdown */}
              <div className="dark:bg-dark-nextadmin-background-subtle dark:border-dark-nextadmin-border-strong sticky top-0 block items-center justify-between border-b border-gray-200 bg-gray-50 px-3 py-2">
                <input
                  type="text"
                  placeholder="Cari kategori..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="dark:bg-dark-nextadmin-background-subtle text-nextadmin-content-inverted dark:text-dark-nextadmin-content-inverted ring-nextadmin-border-default focus:ring-nextadmin-brand-default dark:focus:ring-dark-nextadmin-brand-default dark:ring-dark-nextadmin-border-strong block w-full rounded-md border-0 px-2 py-1 text-xs shadow-sm ring-1 ring-inset transition-all duration-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* Options list */}
              {filteredCategories.length === 0 ? (
                <div className="dark:bg-dark-nextadmin-background-subtle dark:text-dark-nextadmin-content-inverted px-3 py-2 text-xs text-gray-500">
                  Tidak ada hasil ditemukan
                </div>
              ) : (
                filteredCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      if (onChange) {
                        onChange({
                          target: {
                            name,
                            value: cat.id,
                          },
                        } as any);
                      }
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                    className="dark:bg-dark-nextadmin-background-subtle dark:text-dark-nextadmin-content-inverted dark:hover:bg-nextadmin-brand-default hover:bg-gray-100 hover:text-gray-900 cursor-pointer px-3 py-2 text-xs text-gray-700 transition-colors text-left w-full block"
                  >
                    {cat.name}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
        
        {!readonly && !disabled && (
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="bg-nextadmin-brand-default text-nextadmin-brand-inverted hover:bg-nextadmin-brand-emphasis inline-flex items-center justify-center rounded-md text-sm font-normal transition-colors disabled:opacity-50 px-3 h-9 whitespace-nowrap"
          >
            {showForm ? "Batal" : "+ Kategori"}
          </button>
        )}
      </div>

      {showForm && (
        <div className="flex items-center gap-2 border border-dashed ring-nextadmin-border-default dark:ring-dark-nextadmin-border-strong rounded-md p-3 dark:bg-dark-nextadmin-background-subtle bg-gray-50 transition-all">
          <input
            type="text"
            placeholder="Nama kategori baru..."
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            disabled={savingCat}
            className="dark:bg-dark-nextadmin-background-subtle text-nextadmin-content-inverted dark:text-dark-nextadmin-content-inverted ring-nextadmin-border-default focus:ring-nextadmin-brand-default dark:focus:ring-dark-nextadmin-brand-default dark:ring-dark-nextadmin-border-strong block flex-grow rounded-md border-0 px-3 py-1.5 text-sm shadow-sm ring-1 ring-inset transition-all duration-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus-visible:outline-none disabled:opacity-50"
          />
          <button
            type="button"
            onClick={handleCreateCategory}
            disabled={savingCat}
            className="bg-emerald-600 dark:bg-emerald-500 text-white hover:bg-emerald-500 dark:hover:bg-emerald-400 inline-flex items-center justify-center rounded-md text-xs font-normal transition-colors disabled:opacity-50 px-3 h-8 shadow-sm"
          >
            {savingCat ? "Menyimpan..." : "Tambah"}
          </button>
        </div>
      )}
    </div>
  );
}
