"use client";

import dynamic from "next/dynamic";
import React from "react";
import { CustomInputProps } from "@premieroctet/next-admin";

// Dynamically load the actual Tiptap editor client component
// This instructs Next.js to compile/load it only on client-side,
// resolving SSR hydration failures and loading-time hydration checks.
const ArticleRichEditorClient = dynamic(
  () => import("./ArticleRichEditorClient"),
  {
    ssr: false,
    loading: () => (
      <div className="text-sm p-4 text-gray-500 animate-pulse bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-gray-800">
        Memuat Editor Visual Tiptap (Word-Mode)...
      </div>
    ),
  }
);

export default function ArticleRichEditor(props: CustomInputProps) {
  return <ArticleRichEditorClient {...props} />;
}
