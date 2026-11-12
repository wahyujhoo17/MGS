"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { CustomInputProps } from "@premieroctet/next-admin";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";

// ─── Icon Components ──────────────────────────────────────────────────────────

function IconUndo() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 7v6h6" />
      <path d="M3 13a9 9 0 0 1 3-7.7A9 9 0 0 1 21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.6-2.9" />
    </svg>
  );
}

function IconRedo() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 7v6h-6" />
      <path d="M21 13a9 9 0 0 0-3-7.7A9 9 0 0 0 3 12a9 9 0 0 0 9 9 9 9 0 0 0 6.6-2.9" />
    </svg>
  );
}

function IconBulletList() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function IconOrderedList() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="10" y1="6" x2="21" y2="6" />
      <line x1="10" y1="12" x2="21" y2="12" />
      <line x1="10" y1="18" x2="21" y2="18" />
      <path d="M4 6h1v4M4 10h2" />
      <path d="M4 14h2.5L4 16.5V18h3" />
    </svg>
  );
}

function IconBold() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
      <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    </svg>
  );
}

function IconItalic() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="19" y1="4" x2="10" y2="4" />
      <line x1="14" y1="20" x2="5" y2="20" />
      <line x1="15" y1="4" x2="9" y2="20" />
    </svg>
  );
}

function IconStrikethrough() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 4H9a3 3 0 0 0 0 6h6" />
      <path d="M8 20h7a3 3 0 0 0 0-6H9" />
      <line x1="4" y1="12" x2="20" y2="12" />
    </svg>
  );
}

function IconCode() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function IconUnderline() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
      <line x1="4" y1="21" x2="20" y2="21" />
    </svg>
  );
}

function IconHighlight() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function IconLink() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function IconSparkles() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  );
}

function IconAlignLeft() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="17" y1="10" x2="3" y2="10" />
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="21" y1="14" x2="3" y2="14" />
      <line x1="17" y1="18" x2="3" y2="18" />
    </svg>
  );
}

function IconAlignCenter() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="10" x2="6" y2="10" />
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="21" y1="14" x2="3" y2="14" />
      <line x1="18" y1="18" x2="6" y2="18" />
    </svg>
  );
}

function IconAlignRight() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="21" y1="10" x2="7" y2="10" />
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="21" y1="14" x2="3" y2="14" />
      <line x1="21" y1="18" x2="7" y2="18" />
    </svg>
  );
}

function IconAlignJustify() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="21" y1="10" x2="3" y2="10" />
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="21" y1="14" x2="3" y2="14" />
      <line x1="21" y1="18" x2="3" y2="18" />
    </svg>
  );
}

function IconImage() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function IconFullscreen() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function IconExitFullscreen() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7" />
    </svg>
  );
}

// ─── Toolbar Button ───────────────────────────────────────────────────────────

function ToolbarButton({
  onClick,
  active = false,
  disabled = false,
  title,
  children,
  className = "",
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        w-8 h-8 rounded-md flex items-center justify-center transition-all duration-150
        ${active
          ? "bg-indigo-100 text-indigo-700"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
        }
        ${disabled ? "opacity-30 pointer-events-none" : ""}
        ${className}
      `}
      title={title}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="h-5 w-px bg-gray-200 mx-0.5 shrink-0" />;
}

// ─── Heading Dropdown ─────────────────────────────────────────────────────────

function HeadingDropdown({ editor }: { editor: any }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const getCurrentLevel = (): string => {
    for (let i = 1; i <= 6; i++) {
      if (editor.isActive("heading", { level: i })) return `H${i}`;
    }
    return "Normal";
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const headingLevels = [1, 2, 3, 4, 5, 6] as const;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`
          h-8 px-2.5 rounded-md flex items-center gap-1 text-xs font-semibold transition-all duration-150
          ${editor.isActive("heading")
            ? "bg-indigo-100 text-indigo-700"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          }
        `}
        title="Heading"
      >
        <span className="min-w-[2rem]">{getCurrentLevel()}</span>
        <svg className="w-3 h-3 opacity-50" viewBox="0 0 12 12" fill="currentColor">
          <path d="M2.5 4.5L6 8l3.5-3.5" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-xl py-1 min-w-[140px]">
          <button
            type="button"
            onClick={() => {
              editor.chain().focus().setParagraph().run();
              setOpen(false);
            }}
            className={`w-full text-left px-3 py-1.5 text-sm transition-colors ${
              !editor.isActive("heading")
                ? "text-indigo-700 bg-indigo-50"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Normal
          </button>
          {headingLevels.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => {
                editor.chain().focus().toggleHeading({ level }).run();
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 transition-colors ${
                editor.isActive("heading", { level })
                  ? "text-indigo-700 bg-indigo-50"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              style={{ fontSize: `${1.1 - level * 0.06}rem`, fontWeight: 700 }}
            >
              Heading {level}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Add Menu Dropdown ────────────────────────────────────────────────────────

function AddMenuDropdown({
  onImageUpload,
  uploading,
  editor,
}: {
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploading: boolean;
  editor: any;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="h-8 px-2.5 rounded-md flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-all duration-150"
        title="Sisipkan"
      >
        <IconImage />
        <span>Add</span>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-xl py-1 min-w-[180px]">
          <button
            type="button"
            onClick={() => {
              fileInputRef.current?.click();
              setOpen(false);
            }}
            disabled={uploading}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
          >
            <IconImage />
            <span>{uploading ? "Uploading..." : "Sisip Gambar"}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              editor.chain().focus().setHorizontalRule().run();
              setOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
            </svg>
            <span>Garis Pemisah</span>
          </button>
          <button
            type="button"
            onClick={() => {
              editor.chain().focus().toggleBlockquote().run();
              setOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
          >
            <span className="font-serif font-bold text-base leading-none">"</span>
            <span>Blok Kutipan</span>
          </button>
          <button
            type="button"
            onClick={() => {
              editor.chain().focus().toggleCodeBlock().run();
              setOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
          >
            <IconCode />
            <span>Code Block</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            disabled={uploading}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}

// ─── AI Generate Modal ────────────────────────────────────────────────────────

function AIGenerateModal({
  isOpen,
  onClose,
  onGenerate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (data: any) => Promise<void>;
}) {
  const [prompt, setPrompt] = useState("");
  const [angle, setAngle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/mgs-admin/generate-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, angle }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Gagal membuat artikel.");
      }
      
      await onGenerate(data);
      setPrompt("");
      onClose();
    } catch (err: any) {
      setError(err.message || "Gagal membuat artikel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-indigo-50/50">
          <h3 className="font-semibold text-indigo-900 flex items-center gap-2">
            <span className="text-indigo-600"><IconSparkles /></span>
            AI Article Generator
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors" disabled={loading}>
            ✕
          </button>
        </div>
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topik Artikel atau Instruksi Khusus
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Contoh: Buat artikel tips jualan camilan saat lebaran lengkap dengan analisa pasar..."
            className="w-full h-32 p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none bg-gray-50/50"
            disabled={loading}
          />
          <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">
            Sudut Pandang Artikel
          </label>
          <select
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
            disabled={loading}
            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 bg-gray-50/50"
          >
            <option value="">Otomatis (AI menyesuaikan dengan topik)</option>
            <option value="dampak">Analisis dampak (siapa terdampak &amp; seberapa besar)</option>
            <option value="penjelasan">Penjelasan (kenapa bisa terjadi)</option>
            <option value="berita">Berita / update terbaru</option>
            <option value="data">Data &amp; tren pasar</option>
            <option value="opini">Opini / sudut pandang</option>
            <option value="cerita">Cerita / studi kasus</option>
            <option value="panduan">Panduan praktis (tips &amp; solusi)</option>
          </select>
          {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || !prompt.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menulis...
                </>
              ) : (
                <>
                  <IconSparkles />
                  Generate Artikel
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Editor ──────────────────────────────────────────────────────────────

export default function ArticleRichEditorClient({ name, value, onChange, disabled, readonly }: CustomInputProps) {
  const [uploading, setUploading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initialValue = value !== undefined && value !== null ? String(value) : "";

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        // Disable extensions that we configure separately to avoid duplicates
        link: false,
        underline: false,
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "tiptap-link",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      ImageExtension.configure({
        HTMLAttributes: {
          class: "tiptap-image",
        },
      }),
      Placeholder.configure({
        placeholder: "Mulai menulis artikel inspiratif Anda di sini...",
        emptyEditorClass: "is-editor-empty",
      }),
      Underline,
      Highlight.configure({
        HTMLAttributes: {
          class: "tiptap-highlight",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Superscript,
      Subscript,
    ],
    content: initialValue,
    immediatelyRender: false,
    onUpdate({ editor }) {
      const html = editor.getHTML();
      if (onChange) {
        onChange({
          target: {
            name,
            value: html,
          },
        } as any);
      }
    },
  });

  useEffect(() => {
    if (editor && value !== undefined && value !== null) {
      if (editor.getHTML() !== String(value)) {
        editor.commands.setContent(String(value));
      }
    }
  }, [value, editor]);

  const handleLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = prompt("Masukkan URL Link (contoh: https://google.com):", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      try {
        const res = await fetch("/api/mgs-admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ base64: base64String }),
        });

        if (res.ok) {
          const data = await res.json();
          editor.chain().focus().setImage({ src: data.imageUrl }).run();
        } else {
          alert("Gagal mengunggah gambar. Silakan coba lagi.");
        }
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat mengunggah gambar.");
      } finally {
        setUploading(false);
        e.target.value = "";
      }
    };
    reader.readAsDataURL(file);
  }, [editor]);

  const handleAIGenerate = async (data: any) => {
    if (!editor) return;
    
    if (data.content) {
      editor.chain().focus().setContent(data.content).run();
    }
    
    setTimeout(() => {
      const titleInput = document.querySelector('input[name="title"], input[id$="title"]') as HTMLInputElement;
      const slugInput = document.querySelector('input[name="slug"], input[id$="slug"]') as HTMLInputElement;

      if (titleInput && data.title) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
        nativeInputValueSetter?.call(titleInput, data.title);
        titleInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      
      const descInput = document.querySelector('input[name="metaDescription"], textarea[name="metaDescription"], input[id$="metaDescription"], textarea[id$="metaDescription"]') as HTMLInputElement | HTMLTextAreaElement | null;
      if (descInput && data.description) {
        const proto = descInput instanceof HTMLTextAreaElement ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
        Object.getOwnPropertyDescriptor(proto, "value")?.set?.call(descInput, data.description);
        descInput.dispatchEvent(new Event('input', { bubbles: true }));
      }

      if (slugInput && data.slug) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
        nativeInputValueSetter?.call(slugInput, data.slug);
        slugInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }, 100);
  };

  if (!editor) {
    return (
      <div className="text-sm p-6 text-gray-400 animate-pulse bg-gray-50 rounded-lg border border-gray-200">
        Membuat editor visual...
      </div>
    );
  }

  const isEditable = !disabled && !readonly;

  return (
    <div
      className={`tiptap-editor-light w-full rounded-xl overflow-hidden flex flex-col transition-all duration-300 ${
        isFullscreen
          ? "fixed inset-0 z-[9999] h-screen rounded-none bg-white"
          : "relative border border-gray-200 shadow-sm"
      }`}
    >
      {/* ── Toolbar ──────────────────────────────────────────────────────── */}
      {isEditable && (
        <div
          className="flex flex-wrap items-center gap-0.5 px-2.5 py-1.5 border-b border-gray-200 select-none shrink-0 bg-gray-50"
        >
          {/* Undo / Redo */}
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo (Ctrl+Z)"
          >
            <IconUndo />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo (Ctrl+Shift+Z)"
          >
            <IconRedo />
          </ToolbarButton>

          <ToolbarDivider />

          {/* Heading Dropdown */}
          <HeadingDropdown editor={editor} />

          <ToolbarDivider />

          {/* Lists */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <IconBulletList />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            title="Ordered List"
          >
            <IconOrderedList />
          </ToolbarButton>

          <ToolbarDivider />

          {/* Text Formatting */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            title="Tebal (Ctrl+B)"
          >
            <IconBold />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            title="Miring (Ctrl+I)"
          >
            <IconItalic />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
            title="Coret (Strikethrough)"
          >
            <IconStrikethrough />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive("code")}
            title="Inline Code"
          >
            <IconCode />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
            title="Garis Bawah (Ctrl+U)"
          >
            <IconUnderline />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            active={editor.isActive("highlight")}
            title="Highlight"
          >
            <IconHighlight />
          </ToolbarButton>
          <ToolbarButton
            onClick={handleLink}
            active={editor.isActive("link")}
            title="Tautan (Link)"
          >
            <IconLink />
          </ToolbarButton>

          <ToolbarDivider />

          {/* Superscript / Subscript */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            active={editor.isActive("superscript")}
            title="Superscript"
            className="text-[11px] font-bold"
          >
            <span>x<sup className="text-[9px]">²</sup></span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            active={editor.isActive("subscript")}
            title="Subscript"
            className="text-[11px] font-bold"
          >
            <span>x<sub className="text-[9px]">₂</sub></span>
          </ToolbarButton>

          <ToolbarDivider />

          {/* Text Alignment */}
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            active={editor.isActive({ textAlign: "left" })}
            title="Rata Kiri"
          >
            <IconAlignLeft />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            active={editor.isActive({ textAlign: "center" })}
            title="Rata Tengah"
          >
            <IconAlignCenter />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            active={editor.isActive({ textAlign: "right" })}
            title="Rata Kanan"
          >
            <IconAlignRight />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            active={editor.isActive({ textAlign: "justify" })}
            title="Rata Kanan-Kiri"
          >
            <IconAlignJustify />
          </ToolbarButton>

          <ToolbarDivider />

          {/* Add Menu */}
          <AddMenuDropdown
            onImageUpload={handleImageUpload}
            uploading={uploading}
            editor={editor}
          />
          
          <ToolbarDivider />

          {/* AI button removed from here, moved to header portal */}

          {/* Spacer + Fullscreen */}
          <div className="flex-grow" />
          <ToolbarButton
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}
          >
            {isFullscreen ? <IconExitFullscreen /> : <IconFullscreen />}
          </ToolbarButton>
        </div>
      )}

      {/* ── Editor Content Area ──────────────────────────────────────────── */}
      <div
        className={`flex-grow overflow-y-auto transition-all duration-300 bg-white ${
          isFullscreen ? "h-[calc(100vh-50px)]" : "max-h-[650px] min-h-[400px]"
        }`}
      >
        <EditorContent
          editor={editor}
          className="tiptap-content-area article-content cursor-text"
        />
      </div>

      {/* Upload indicator */}
      {uploading && (
        <div className="px-4 py-2 text-xs text-indigo-600 animate-pulse border-t border-gray-200 font-mono bg-gray-50">
          ⏳ Mengunggah gambar ke server...
        </div>
      )}

      <AIGenerateModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onGenerate={handleAIGenerate}
      />

      <input type="hidden" name={name} value={editor.getHTML()} />

      {mounted &&
        require("react-dom").createPortal(
          <div className="fixed bottom-8 right-8 z-[1000] animate-in slide-in-from-bottom-4 fade-in duration-300 drop-shadow-2xl">
            <button
              type="button"
              onClick={() => setIsAIModalOpen(true)}
              className="flex items-center justify-center w-14 h-14 text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-full shadow-2xl hover:shadow-indigo-500/40 transition-all hover:-translate-y-1 border border-white/20"
              title="Generate Artikel dengan AI"
            >
              <div className="scale-150"><IconSparkles /></div>
            </button>
          </div>,
          document.body
        )}
    </div>
  );
}
