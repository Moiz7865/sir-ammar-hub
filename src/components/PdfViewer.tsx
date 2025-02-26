
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PdfViewerProps {
  url: string;
}

const PdfViewer = ({ url }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  const zoomIn = () => setScale(prev => Math.min(prev + 0.1, 2.0));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-4">
      <div className="fixed top-4 z-10 flex gap-2 bg-gray-800 p-2 rounded-lg shadow-lg">
        <Button
          onClick={previousPage}
          disabled={pageNumber <= 1}
          variant="outline"
          size="icon"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="flex items-center px-4 text-white">
          Page {pageNumber} of {numPages}
        </span>
        <Button
          onClick={nextPage}
          disabled={pageNumber >= numPages}
          variant="outline"
          size="icon"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="mx-2 w-px bg-gray-600" />
        <Button onClick={zoomIn} variant="outline" size="icon">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button onClick={zoomOut} variant="outline" size="icon">
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-20 max-w-full overflow-auto">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          }
          error={
            <div className="text-red-500 p-4">
              Failed to load PDF. Please try again later.
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
