import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import Image from './tiptap/Image'
import style from './App.module.less'

const App = () => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Image],
    content: `
        <p>This is a basic example of implementing images. Drag to re-order.</p>
        <img src="https://images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg"></img>
      `,
  })

  return (
    <main className={style.container}>
      <EditorContent editor={editor} style={{ maxWidth: '50%' }} />
      <div className={style.divider}></div>
      <div dangerouslySetInnerHTML={{ __html: editor?.getHTML() || '' }} style={{ maxWidth: '50%' }} />
    </main>
  )
}

export default App
