
import { useSearchParams } from 'react-router-dom';
import PdfViewer from '@/components/PdfViewer';

const ViewNote = () => {
  const [searchParams] = useSearchParams();
  const noteUrl = searchParams.get('url');

  if (!noteUrl) {
    return <div className="text-center p-4 text-red-500">No PDF URL provided</div>;
  }

  return <PdfViewer url={noteUrl} />;
};

export default ViewNote;
