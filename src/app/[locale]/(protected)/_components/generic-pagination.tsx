import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

export default function GenericPagination({
  path = "?page=[page]",
  page = 1,
  total,
  lastPage = 1,
}: Readonly<{
  path?: string;
  page?: number;
  total?: number;
  lastPage?: number;
}>) {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const newPath = q ? `?q=${q}${path.replace("?", "&")}` : path;

  return (
    <div className="flex flex-row items-center">
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationLink
                href={newPath.replace("[page]", (page - 1).toString())}
              >
                <ChevronLeft className="h-4 w-4" />
                {`${t("crud.previous")}`}
              </PaginationLink>
            </PaginationItem>
          )}

          {lastPage > 1 &&
            Array.from({ length: lastPage }, (x, i) => i + 1).map((value) => (
              <PaginationItem key={value}>
                <PaginationLink
                  isActive={value == page}
                  href={newPath.replace("[page]", value.toString())}
                >
                  {value}
                </PaginationLink>
              </PaginationItem>
            ))}

          {page < lastPage && (
            <PaginationItem>
              <PaginationLink
                href={newPath.replace("[page]", (page + 1).toString())}
              >
                {`${t("crud.next")}`}
                <ChevronRight className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
      {total && (
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          ({t("crud.total")} {total})
        </span>
      )}
    </div>
  );
}
