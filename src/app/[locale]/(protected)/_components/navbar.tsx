"use client";

import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavBarItem {
  title: string;
  path: string;
  icon?: React.ReactNode;
}

export default function NavBar({
  menu,
}: Readonly<{
  menu?: NavBarItem[];
}>) {
  const [internalMenu, setInternalMenu] = useState<NavBarItem[]>(menu ?? []);
  const pathname = usePathname();
  const t = useTranslations();

  useEffect(() => {
    if (menu) setInternalMenu(menu);
  }, [menu]);

  return (
    <aside className="flex flex-col w-14 sm:w-60 bg-navbar">
      <div className="flex flex-col p-2">
        <ul className="flex flex-col gap-1">
          {internalMenu.map((item) => {
            const isActive: boolean = pathname == item.path;
            return (
              <li key={JSON.stringify(item)}>
                <Link
                  href={item.path}
                  className={cn([
                    "flex flex-row gap-2 items-center rounded-md p-2 sm:px-3 transition-all",
                    "hover:bg-primary hover:text-primary-foreground sm:hover:ps-5",
                    isActive
                      ? "sm:ps-5 bg-primary text-primary-foreground"
                      : "",
                  ])}
                >
                  {item.icon}
                  <span className="hidden sm:flex">{t(item.title)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-row justify-center mt-auto text-center text-sm py-2 text-foreground-muted">
        <span className="hidden sm:flex">{t("geral.version")}&nbsp;</span>
        {process.env.NEXT_PUBLIC_APP_VERSION}
      </div>
    </aside>
  );
}
