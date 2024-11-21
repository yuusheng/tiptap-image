import { EditorProvider } from '@tiptap/react'
import './App.css'
import { EditorJSONPreview } from './components/Preview'
import Tiptap from './components/TipTap'
import StarterKit from '@tiptap/starter-kit'

// define your extension array
const extensions = [StarterKit]

function App() {
  return (
    <div className="container">
      <EditorProvider extensions={extensions}>
        <div className="grid">
          <Tiptap />
          <EditorJSONPreview />
        </div>
      </EditorProvider>
    </div>
  )
}

export default App
