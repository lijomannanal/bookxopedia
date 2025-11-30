'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeftIcon, BookOpen } from 'lucide-react';
import { MENU_ITEMS } from '@/constants';
import { GenreResponse } from '@/model/genre';
import TopGenre from '../TopGenre';
import ThemeSwitcher from '../ThemeSwitcher';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  topGenres: GenreResponse[];
}

const Sidebar = ({ sidebarOpen, setSidebarOpen, topGenres }: SidebarProps) => {
  const pathname = usePathname();
  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLElement>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) {
        return;
      }

      if (
        !sidebarOpen ||
        (target instanceof HTMLElement && sidebar.current.contains(target)) ||
        (target instanceof HTMLElement && trigger.current.contains(target))
      ) {
        return;
      }
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-[990] flex h-screen w-50 bg-white border-r p-4 flex-col overflow-y-hidden  duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex mt-[60px] lg:mt-0 items-center gap-2 mb-8">
        <Link href="/">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-secondary" />
            <span className="text-lg font-bold">Bookxopedia</span>
          </div>
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="flex-1 text-sm">
          {/* <!-- Menu Group --> */}
          {MENU_ITEMS.map((menu) => {
            const { name, icon: Icon, path } = menu;
            return (
              <Link
                key={name}
                href={path}
                className={`flex items-center gap-2 p-2 rounded-md hover:bg-blue-100 dark:hover:bg-slate-800`}
              >
                <div
                  className={`rounded-md ${pathname.startsWith(path) ? 'bg-secondary' : 'bg-gray-200'} p-1`}
                >
                  <Icon
                    className="w-4 h-4"
                    color={pathname.startsWith(path) ? 'white' : 'black'}
                    strokeWidth={pathname.startsWith(menu.path) ? 3 : undefined}
                  />
                </div>
                <span
                  className={`text-menu-item leading-6 ${
                    pathname.startsWith(menu.path)
                      ? 'font-medium'
                      : 'font-normal'
                  }`}
                >
                  {menu.name}
                </span>
              </Link>
            );
          })}
          <TopGenre topGenres={topGenres} pathname={pathname} />
          <div className="pl-2">
            <ThemeSwitcher />
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
