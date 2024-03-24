'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routes = [
  {
    label: 'Draft',
    href: '/editor/draft',
  },
  {
    label: 'Quill',
    href: '/editor/quill',
  },
  {
    label: 'Slate',
    href: '/editor/slate-react',
  },
  {
    label: 'Result',
    href: '/editor/result',
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <ul className="h-full flex flex-col text-sm md:text-lg w-[200px] p-2 bg-tertiary">
      {routes.map((route) => {
        const active = pathname === route.href;
        return (
          <li key={route.label} className="flex">
            <Link href={route.href}
              className={`whitespace-nowrap transition-all flex-1 p-2 text-primary rounded-lg ${active
                ? 'bg-secondary  font-bold'
                : 'bg-tertiary'
                }`}
            >
              {route.label }
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
