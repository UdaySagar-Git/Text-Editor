"use client"

import { useEffect, useMemo, useState } from 'react';
import Viewer from '@/app/components/Viewer';
import Sidebar from '@/app/components/Sidebar';
import Draft from '@/app/components/Draft';
import Slate from '@/app/components/Slate';
import Quill from '@/app/components/Quill'
import { useRouter } from 'next/navigation';
import sanitizeHtml from 'sanitize-html';


interface EditorProps {
  name: string;
}

export default function Editor({ name }: EditorProps) {
  const [html, setHtml] = useState('');

  const router = useRouter();

  const handleTextChange = (html: string) => {
    setHtml(html);
  };

  const sanitizedHtml = useMemo(() => sanitizeHtml(html), [html]);

  const handleSave = () => {
    localStorage.setItem('html', sanitizedHtml);
    router.push('/editor/result');
  }

  const handleClear = () => {
    localStorage.removeItem('html');
    setHtml('');
  }

  const editors: Record<string, React.ReactNode> = {
    draft: <Draft onChange={handleTextChange} />,
    quill: <Quill onChange={handleTextChange} />,
    'slate-react': <Slate onChange={handleTextChange} />,
  };
  const iName = name.toLowerCase();

  useEffect(() => {
    if (editors[name] !== undefined) return;

    setHtml(localStorage.getItem('html') ?? '');
  }, []);

  return (
    <div className="h-full w-full flex">
      <Sidebar />
      <div className='w-1/2 overflow-hidden border shadow-lg relative'>
        <main className="h-full">
          {editors[iName] ?? <Viewer html={sanitizedHtml} />}
        </main>
        <footer className="flex absolute top-0 right-0 justify-between p-2 gap-2">
          {
            iName !== 'result' ?
              <button onClick={handleSave} className="px-2 py-1 bg-secondary text-white rounded-lg">Save</button>
              :
              <button onClick={handleClear} className="px-2 py-1 bg-rose-600 text-white rounded-lg">Clear</button>
          }
        </footer>
      </div>
      <div className="w-1/2 overflow-y-auto">
        <h2 className="text-xl font-bold p-2 border border-b shadow-sm ">HTML Output</h2>
        <pre className="wh-full overflow-x-hidden p-2">
          {formatHtml(sanitizedHtml)}
        </pre>
      </div>
    </div>
  );
}

const formatHtml = (html: string) => {
  const formattedHtml = html.replace(/></g, ">\n<");
  return formattedHtml;
};

