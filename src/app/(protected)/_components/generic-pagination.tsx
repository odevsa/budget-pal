import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  return (
    <div className="flex flex-row items-center">
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={path.replace("[page]", (page - 1).toString())}
              />
            </PaginationItem>
          )}

          {lastPage > 1 &&
            Array.from({ length: lastPage }, (x, i) => i + 1).map((value) => (
              <PaginationItem key={value}>
                <PaginationLink
                  isActive={value == page}
                  href={path.replace("[page]", value.toString())}
                >
                  {value}
                </PaginationLink>
              </PaginationItem>
            ))}

          {page < lastPage && (
            <PaginationItem>
              <PaginationNext
                href={path.replace("[page]", (page + 1).toString())}
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
