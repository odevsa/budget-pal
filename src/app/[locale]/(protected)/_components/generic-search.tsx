"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function GenericSearch({
  q = "",
  page,
}: Readonly<{ q?: string; page?: number }>) {
  const t = useTranslations();
  const [query, setQuery] = useState<string | undefined>(q);

  useEffect(() => {
    setQuery(q);
  }, [q]);

  return (
    <form className="flex flex-row gap-0 relative">
      <Input
        name="q"
        placeholder={t("crud.search")}
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        className="pe-14"
      />
      {page && page != 1 && <Input name="page" type="hidden" value={page} />}
      <Button variant={"ghost"} className="absolute right-0">
        <SearchIcon />
      </Button>
    </form>
  );
}
