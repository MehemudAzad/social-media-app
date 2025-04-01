"use client"; // Required for Next.js 13+ with App Router

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form"; // Used to bind to react-hook-form

const TiptapEditor = ({ control, name }: { control: any; name: string }) => {
  const { setValue } = useFormContext(); // Get setValue from react-hook-form

  const [content, setContent] = useState("<p>Start typing...</p>");

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Heading.configure({ levels: [1, 2, 3] }),
      Image,
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
      setValue(name, editor.getHTML()); // Update react-hook-form with editor content
    },
  });

  const addImage = () => {
    const url = prompt("Enter image URL:");
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  };

  const setTextColor = (color: string) => {
    if (editor) {
      editor.chain().focus().setColor(color).run();
    }
  };

  useEffect(() => {
    // Sync editor content with react-hook-form when editor is initialized
    setValue(name, content);
  }, [setValue, name, content]);

  return (
    <div className="border p-4 rounded-lg">
      {/* Toolbar */}
      <div className="mb-2 flex space-x-2">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className="px-2 py-1 border"
        >
          Bold
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className="px-2 py-1 border"
        >
          Italic
        </button>
        <button
          onClick={() => editor?.commands.setHeading({ level: 1 })}
          className="px-2 py-1 border"
        >
          H1
        </button>
        <button
          onClick={() => editor?.chain().focus().setHeading({ level: 2 }).run()}
          className="px-2 py-1 border"
        >
          H2
        </button>
        <button onClick={addImage} className="px-2 py-1 border">
          Add Image
        </button>

        {/* Color Picker */}
        <input
          type="color"
          onChange={(e) => setTextColor(e.target.value)}
          className="ml-2 cursor-pointer"
        />
      </div>

      {/* Editor */}
      <div className="border p-2 min-h-[150px]">
        <EditorContent editor={editor} />
      </div>

      {/* Hidden input for react-hook-form */}
      <Controller
        name={name} // This name will be used as the field name for react-hook-form
        control={control}
        render={({ field }) => (
          <textarea
            {...field} // Bind to react-hook-form field
            value={content} // The HTML content of the editor
            style={{ display: "none" }} // Hide the actual input field
          />
        )}
      />
    </div>
  );
};

export default TiptapEditor;
