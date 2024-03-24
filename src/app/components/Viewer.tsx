interface ViewerProps {
  html: string;
}

export default function Viewer({ html }: ViewerProps) {
  return (
    <div>
      <h1 className="text-xl font-bold text-center p-2 border border-b">Viewer</h1>

      {
        html === '' ?
          <p className="p-4 text-center text-gray-500">Save some text to preview here</p>
          :
          <div
            className="disable-tailwind p-4 h-full overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
      }
    </div>
  );
}
