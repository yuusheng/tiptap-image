import { NodeViewWrapper } from '@tiptap/react'
import { useEffect, useState } from 'react'

async function downloadImage(url: string) {
  const image = await fetch(url)
  const imageBlog = await image.blob()

  return new File([imageBlog], 'wtf.png')
}

function readImage(image: File) {
  console.log(image)
  return new Promise(resolve => {
    const reader = new FileReader()

    reader.onload = readerEvent => {
      resolve(readerEvent.target?.result)
    }
    reader.readAsDataURL(image)
  })
}

export default function ImageComp(props: any) {
  const [uploading, setUploading] = useState(false)
  const [imgSrc, setImgSrc] = useState(props.node.attrs.src)

  useEffect(() => {
    setUploading(true)
    downloadImage(props.node.attrs.src)
      .then(file => readImage(file))
      .then(src => {
        setImgSrc(src as string)
        props.updateAttributes({
          src,
        })
        setUploading(false)
      })
  }, [])

  return (
    <NodeViewWrapper className="react-component">
      {uploading ? <div>loading</div> : <img src={imgSrc} alt="" />}
    </NodeViewWrapper>
  )
}
