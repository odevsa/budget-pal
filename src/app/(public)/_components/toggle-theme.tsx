"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function ToggleTheme(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) {
  const { setTheme } = useTheme();

  return (
    <>
      <button
        className="flex-row items-center gap-2 hidden dark:flex"
        onClick={() => setTheme("light")}
      >
        <SunIcon />
      </button>
      <button
        className="flex flex-row items-center gap-2 dark:hidden"
        onClick={() => setTheme("dark")}
      >
        <MoonIcon />
      </button>
    </>
  );
}
