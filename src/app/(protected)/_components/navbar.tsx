"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  useEffect(() => {
    if (menu) setInternalMenu(menu);
  }, [menu]);

  return (
    <aside className="flex flex-col w-60 bg-navbar">
      <div className="flex flex-col p-2">
        <ul className="flex flex-col gap-1">
          {internalMenu.map((item) => {
            const isActive: boolean = pathname == item.path;
            return (
              <li key={JSON.stringify(item)}>
                <a
                  href={item.path}
                  className={cn([
                    "flex flex-row gap-2 items-center rounded-md px-3 py-2 transition-all",
                    "hover:bg-primary hover:text-primary-foreground hover:ps-5",
                    isActive ? "ps-5 bg-primary text-primary-foreground" : "",
                  ])}
                >
                  {item.icon && item.icon}
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-auto text-center text-sm py-2 text-foreground-muted">
        Version {process.env.NEXT_PUBLIC_APP_VERSION}
      </div>
    </aside>
  );
}
