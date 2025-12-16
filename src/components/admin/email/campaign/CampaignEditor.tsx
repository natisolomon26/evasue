"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export default function CampaignEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
    immediatelyRender: false, // ✅ This fixes SSR hydration mismatch
  });

  if (!editor) return null; // Only render on client

  return (
    <div className="border rounded-lg p-3 bg-white shadow-sm min-h-[200px]">
      <EditorContent editor={editor} />
    </div>
  );
}
