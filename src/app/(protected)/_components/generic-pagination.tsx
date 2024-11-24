import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const newPath = q ? `?q=${q}${path.replace("?", "&")}` : path;

  return (
    <div className="flex flex-row items-center">
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={newPath.replace("[page]", (page - 1).toString())}
              />
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
              <PaginationNext
                href={newPath.replace("[page]", (page + 1).toString())}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
      {total && (
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          (Total {total})
        </span>
      )}
    </div>
  );
}
