"use client";

import Logo from "@/components/Logo";
import { useEffect, useState } from "react";

interface NavBarItem {
  title: string;
  path: string;
  icon?: JSX.Element;
}
export default function NavBar({
  menu,
}: Readonly<{
  menu?: NavBarItem[];
}>) {
  const [internalMenu, setInternalMenu] = useState<NavBarItem[]>(menu ?? []);

  useEffect(() => {
    if (menu) setInternalMenu(menu);
  }, [menu]);

  return (
    <aside className="flex flex-col w-60 bg-navbar">
      <div className="flex flex-col px-3 py-2">
        <ul>
          {internalMenu.map((item) => (
            <li key={JSON.stringify(item)}>
              <a
                href={item.path}
                className={
                  "flex flex-row gap-2 items-center rounded-md px-3 py-2 transition-all" +
                  " hover:bg-primary hover:text-background hover:ps-5"
                }
              >
                {item.icon && item.icon}
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto text-center text-sm py-2 text-foreground-muted">
        Version {process.env.NEXT_PUBLIC_APP_VERSION}
      </div>
    </aside>
  );
}
