import Image from '@tiptap/extension-image'
import type { EditorView } from '@tiptap/pm/view'
import { Plugin } from 'prosemirror-state'

function pasteFile({ images, view }: { images: File[]; view: EditorView }) {
  const { schema } = view.state

  images.forEach(image => {
    console.log(image)
    const reader = new FileReader()

    reader.onload = readerEvent => {
      const node = schema.nodes.image.create({
        src: readerEvent.target.result,
      })

      // view.posAtCoords
      // const transaction = view.state.tr.replaceWith(node)
      // view.update(node)
      // view.dispatch(transaction)
    }
    reader.readAsDataURL(image)
  })
}

async function downloadImage(url: string) {
  const image = await fetch(url)
  const imageBlog = await image.blob()

  return new File([imageBlog], 'wtf.png')
}

export default Image.extend({
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            drop(view, event) {
              const hasFiles = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length

              if (!hasFiles) {
                return
              }

              const images = Array.from(event.dataTransfer.files).filter(file => /image/i.test(file.type))

              if (images.length === 0) {
                return
              }

              event.preventDefault()

              const { schema } = view.state
              const coordinates = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              })

              images.forEach(image => {
                const reader = new FileReader()

                reader.onload = readerEvent => {
                  const node = schema.nodes.image.create({
                    src: readerEvent.target.result,
                  })
                  const transaction = view.state.tr.insert(coordinates.pos, node)
                  view.dispatch(transaction)
                }
                reader.readAsDataURL(image)
              })
            },
            paste(view, event) {
              const reg = /<img[^src=]*src=((?<quote>['"])(?<href>[^'"]*)(\k<quote>))/g
              const pasteInfo = event.clipboardData?.getData('text/html') ?? ''
              if (pasteInfo.match(reg)?.length) {
                let parsedPasteInfo: any

                while ((parsedPasteInfo = reg.exec(pasteInfo)) !== null) {
                  const imageHref = parsedPasteInfo?.groups?.href as string
                  downloadImage(imageHref).then(url => pasteFile({ images: [url], view }))
                }
              }

              const hasFiles = event.clipboardData && event.clipboardData.files && event.clipboardData.files.length
              if (hasFiles) {
                const images = Array.from(event.clipboardData.files).filter(file => /image/i.test(file.type))

                if (images.length === 0) {
                  return
                }

                event.preventDefault()
                pasteFile({
                  images,
                  view,
                })
                return
              }
            },
          },
        },
      }),
    ]
  },
})
