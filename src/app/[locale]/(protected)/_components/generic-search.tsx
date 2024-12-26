"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "@/i18n/routing";
import { EraserIcon, SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function GenericSearch({
  children,
  q = "",
  page,
}: Readonly<{ children?: React.ReactNode; q?: string; page?: number }>) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState<string | undefined>(q);

  useEffect(() => {
    setQuery(q);
  }, [q]);

  const handleClick = () => {
    router.replace(pathname);
  };

  return (
    <form className="flex flex-row gap-2 relative">
      {children}
      <Input
        name="q"
        placeholder={t("crud.search")}
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      {page && page != 1 && <Input name="page" type="hidden" value={page} />}
      <Button variant={"outline"}>
        <SearchIcon />
      </Button>
      <Button type="button" variant={"outline"} onClick={handleClick}>
        <EraserIcon />
      </Button>
    </form>
  );
}
