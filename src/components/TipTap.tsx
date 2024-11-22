import Document from '@tiptap/extension-document'

import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import Image from '../tiptap/Image'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Image],
    content: `
        <p>This is a basic example of implementing images. Drag to re-order.</p>
        <div>1234</div>
        <img src="https://images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg"></img>
      `,
  })

  return (
    <>
      <p>This is a basic example of implementing images. Drag to re-order.</p>
      <p>1234</p>
      <img src="0" />
      <EditorContent editor={editor} />
      output:
      <div dangerouslySetInnerHTML={{ __html: editor?.getHTML() || '' }}></div>
      {editor?.getHTML()}
    </>
  )
}

export default Tiptap
