/* eslint-disable @next/next/no-img-element */
import { useCallback, useState } from "react"
// import "../../../globals.css"
// import { useResizeObserver } from "@wojtekmaj/react-hooks"
import { pdfjs, Document, Page } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
// import "@g"
import "react-pdf/dist/Page/TextLayer.css"
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url,
// ).toString()
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

// import { Document, Page } from "react-pdf/dist/esm/entry.webpack"
export default function PDFViewer({ file }: { file: string }) {
  const [numPages, setNumPages] = useState<number>()
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null)
  const [containerWidth, setContainerWidth] = useState<number>()

  const [pageNumber, setPageNumber] = useState<number>(1)
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages)
  }
  return (
    <div className="pdf-scroll h-[65vh] flex justify-center items-center flex-col">
      {/* "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" */}
      <Document
        className="overflow-scroll h-[58vh] w-[50vw] pdf-scroll"
        // style={{

        // }}
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} className="pdf-scroll" />
      </Document>
      <div className="flex mt-1 justify-center">
        <div className="inline-block">
          <div className="inline-block hover:bg-gray-400 rounded-full cursor-pointer transition-colors">
            <img
              src="/arrow_prev.svg"
              alt="prev"
              className="inline-block h-10 aspect-square"
            />
          </div>
          <div className="inline-block px-2">Page {pageNumber}</div>
          <div className="inline-block hover:bg-gray-400 rounded-full cursor-pointer transition-colors">
            <img
              src="/arrow_next.svg"
              alt="next"
              className="inline-block h-10 aspect-square"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
