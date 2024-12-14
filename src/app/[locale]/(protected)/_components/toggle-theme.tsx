"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

export function ToggleTheme() {
  const t = useTranslations();
  const { setTheme } = useTheme();

  return (
    <>
      <button
        className="flex-row items-center gap-2 hidden dark:flex"
        onClick={() => setTheme("light")}
      >
        <SunIcon />
        {t("geral.lightMode")}
      </button>
      <button
        className="flex flex-row items-center gap-2 dark:hidden"
        onClick={() => setTheme("dark")}
      >
        <MoonIcon />
        {t("geral.darkMode")}
      </button>
    </>
  );
}
