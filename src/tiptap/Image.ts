import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import Component from './ImageComp'

export default Node.create({
  name: 'uploadingImage',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      src: {},
    }
  },
  parseHTML() {
    return [{ tag: 'img' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes({ ...HTMLAttributes, style: 'max-width: 100%' })]
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component)
  },
})
