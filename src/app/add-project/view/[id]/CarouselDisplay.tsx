import { memo } from "react"

/* eslint-disable @next/next/no-img-element */
function CarouselDisplay({
  file,
}: {
  file: {
    fileName: string
    preview: string
    filePath: string
    index: number
    type: string
  }
}) {
  return (
    <>
      {file.type == "image" && (
        <img src={file.filePath} alt="img" className="max-h-[72vh]" />
      )}
      {file.type == "pdf" && (
        <object
          draggable={true}
          className="object-contain h-full w-[70vw]"
          data={file.filePath}
          type="application/pdf"
        ></object>
      )}
    </>
  )
}
export default memo(CarouselDisplay)
