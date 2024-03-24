"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {

  const router = useRouter();

  useEffect(() => {
    router.push('/editor/draft');
  }
    , []);

  return (
    <div className="flex flex-col items-center pt-4 md:pt-8">
      <p className="text-gray-500">Redirecting to editor...</p>
      <Link href="/editor/draft" className="text-blue-500 hover:underline">
        Click here if you are not redirected.
      </Link>
    </div>
  );
}
