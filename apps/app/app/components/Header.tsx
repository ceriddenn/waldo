/* eslint-disable @next/next/no-img-element */
'use client';
import { Spinner } from 'ui';
import { discord, docs, github } from '@utils/links';
import { useSession } from '@contexts/SessionContext';
//import useSite from '@site';
export default function Header() {
  const s = useSession();
  const session = s?.session;
  console.log(session);
  return (
    <>
      <div className="  text-gray-400 min-w-max items-center gap-2 w-[100%] z-100">
        <div className="flex m-8 mx-12">
          <div className="font-semibold text-md gap-3 items-center flex flex-row">
            <h1>Hey,</h1>
            {session ? (
              <img
                className="h-8 w-8 rounded-2xl"
                alt="User Image"
                src={session?.image && session?.image}
              />
            ) : (
              <Spinner />
            )}
            <h1 className="text-gray-700">{session && session.name}</h1>
          </div>
        </div>
      </div>
    </>
  );
}

interface NavItem {
  label: string;
  href: string;
  pathName: string | null;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Home',
    href: '/',
    pathName: '/',
  },
  {
    label: 'Submissions',
    href: '/submissions',
    pathName: '/submissions',
  },
  {
    label: 'Community',
    href: discord,
    pathName: null,
  },
  {
    label: 'Docs',
    href: docs,
    pathName: null,
  },
  {
    label: 'Github',
    href: github,
    pathName: null,
  },
];
