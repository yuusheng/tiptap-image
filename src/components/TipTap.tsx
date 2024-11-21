import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'

import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import ImageUltra from '../tiptap/ImageUltra'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Dropcursor, ImageUltra],
    content: `
        <p>This is a basic example of implementing images. Drag to re-order.</p>
      `,
  })

  return (
    <>
      <EditorContent editor={editor} />
    </>
  )
}

export default Tiptap
