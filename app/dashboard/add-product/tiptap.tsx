'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { Toggle } from "@/components/ui/toggle"
import { FaBold, FaItalic, FaListOl, FaListUl, FaStrikethrough } from 'react-icons/fa'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'

const Tiptap = ({ val, disabled }: { val: string, disabled: boolean }) => {
    const { setValue } = useFormContext();
    
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                orderedList: {
                    HTMLAttributes: {
                        class: "list-decimal pl-4"
                    }
                },
                bulletList: {
                    HTMLAttributes: {
                        class: "list-disc pl-4 text-primary"
                    }
                }
            }),
            Placeholder.configure({
                placeholder: 'Enter a description...',
                emptyEditorClass: "before:content-[attr(placeholder)] before:text-muted before:absolute before:top-2 before:left-3 before:text-sm",
                showOnlyWhenEditable: true,
            })
        ],
        editable: !disabled,
        onUpdate: ({ editor }) => {
            const content = editor.getHTML();
            setValue("description", content);
        },
        editorProps: {
            attributes: {
                class: "relative w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
            }
        },
        content: val,
    })

    useEffect(() => {
        if(editor?.isEmpty) editor.commands.setContent(val)
    },[val]);

    return (
        <div className='flex flex-col gap-2'>
            {editor && (
                <div className='border border-input flex gap-2 p-2'>
                    <Toggle
                        size={"sm"}
                        pressed={editor.isActive("bold")}
                        onPressedChange={() => editor.chain().focus().toggleBold().run()}
                    >
                        <FaBold className='w-4 h-4' />
                    </Toggle>
                    <Toggle
                        size={"sm"}
                        pressed={editor.isActive("italic")}
                        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                    >
                        <FaItalic className='w-4 h-4' />
                    </Toggle>
                    <Toggle
                        size={"sm"}
                        pressed={editor.isActive("strike")}
                        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                    >
                        <FaStrikethrough className='w-4 h-4' />
                    </Toggle>
                    <Toggle
                        size={"sm"}
                        pressed={editor.isActive('orderedList')}
                        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                    >
                        <FaListOl className='w-4 h-4' />
                    </Toggle>
                    <Toggle
                        size={"sm"}
                        pressed={editor.isActive('bulletList')}
                        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                    >
                        <FaListUl className='w-4 h-4' />
                    </Toggle>
                </div>
            )}
            <EditorContent editor={editor} />
        </div>
    )
}

export default Tiptap;
