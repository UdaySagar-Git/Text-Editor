import Editor from '../../components/Editor';
interface EditorPageProps {
  params: {
    name: string;
  };
}

export default function EditorPage({ params: { name } }: EditorPageProps) {
  return <Editor name={name} />;
}
