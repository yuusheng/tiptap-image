import { NodeViewWrapper } from '@tiptap/react'
import { useEffect, useState } from 'react'
import style from './image.module.less'

function useImage(originalUrl: string) {
  const [uploading, setUploading] = useState(false)
  const [imgSrc, setImgSrc] = useState(originalUrl)

  function readImage(image: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = readerEvent => {
        resolve(readerEvent.target?.result)
      }
      reader.onerror = reject
      reader.readAsDataURL(image)
    })
  }

  useEffect(() => {
    setUploading(true)
    const controller = new AbortController()

    fetch(originalUrl, { signal: controller.signal })
      .then(res => res.blob())
      .then(blob => readImage(new File([blob], 'test.png')))
      .then(src => {
        setImgSrc(src as string)
        setUploading(false)
      })

    return () => {
      controller.abort()
    }
  }, [])

  return {
    uploading,
    imgSrc,
  }
}

export default function ImageComp(props: any) {
  const { uploading, imgSrc } = useImage(props.node.attrs.src)

  useEffect(() => {
    props.updateAttributes({
      src: imgSrc,
    })
  }, [imgSrc])

  return (
    <NodeViewWrapper>
      <div className={uploading ? style.uploading : ''}>
        <img src={imgSrc} style={{ maxWidth: '100%' }} alt="" />
      </div>
    </NodeViewWrapper>
  )
}
