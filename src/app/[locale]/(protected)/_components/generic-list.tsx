"use client";

import { Loading } from "@/components/Loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { maskCurrency, maskDecimal } from "@/core/mask";
import { useToast } from "@/hooks/use-toast";
import { Link } from "@/i18n/routing";
import { cn, evalProperty } from "@/lib/utils";
import { EditIcon, TrashIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GenericPagination from "./generic-pagination";
import { format } from "date-fns";
import { dateLocales } from "@/i18n";

interface GenericListField {
  key: string;
  position?: "left" | "center" | "right";
  label?: string;
  process?: string;
  class?: string;
}

interface GenericListAction {
  title: string;
  element: React.ReactNode;
  onClick?(item: any): void;
}

export default function GenericList({
  data = [],
  page = 1,
  total,
  lastPage = 1,
  fields = [
    { key: "id", position: "left", label: "crud.id" },
    { key: "title", position: "left", label: "crud.title" },
  ],
  actions = [],
  editPath,
  actionDelete,
}: Readonly<{
  data: any[];
  page?: number;
  total?: number;
  lastPage?: number;
  fields?: GenericListField[];
  actions?: GenericListAction[];
  editPath?: string;
  actionDelete?(item: any): Promise<boolean>;
}>) {
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const booleanBox = (
    v: boolean,
    labelTrue: string = "crud.yes",
    labelFalse: string = "crud.no"
  ) =>
    v ? (
      <span className="bg-success text-xs px-1 py-1 rounded">
        {t(labelTrue)}
      </span>
    ) : (
      <span className="bg-destructive text-xs px-1 py-1 rounded">
        {t(labelFalse)}
      </span>
    );

  const process = {
    maskDecimal,
    date: (v: Date) => format(v, "PP", { locale: dateLocales[locale] }),
    time: (v: Date) => format(v, "p", { locale: dateLocales[locale] }),
    datetime: (v: Date) => format(v, "PP p", { locale: dateLocales[locale] }),
    monetary: (v: number) => "$ " + maskCurrency(v, locale),
    active: (v: boolean) => booleanBox(v, "crud.active", "crud.inactive"),
    boolean: (v: boolean) => booleanBox(v),
  };

  const handleDelete = async (item: any) => {
    if (!actionDelete) return;

    setLoading(true);
    const deleted = await actionDelete(item);
    setLoading(false);

    toast({
      variant: deleted ? "success" : "destructive",
      title: t("crud.delete"),
      description: deleted
        ? t("crud.message.deleteSuccess")
        : t("crud.message.deleteFailure"),
    });

    if (!deleted) return;

    router.refresh();
  };

  const displayActions = actions.length > 0 || editPath || actionDelete;
  return (
    <Loading visible={loading}>
      <div className="flex flex-col gap-4">
        <Table>
          <TableHeader>
            <TableRow className="!bg-transparent">
              {fields.map((field) => (
                <TableHead
                  key={field.label}
                  className={cn(
                    "font-bold text-foreground",
                    `text-${field.position ?? "center"}`
                  )}
                >
                  {t(field.label)}
                </TableHead>
              ))}
              {displayActions && (
                <TableHead className="text-right font-bold text-foreground">
                  {t("crud.actions")}
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={`item-${item.id}`}
                className="odd:bg-gray-500 odd:bg-opacity-10 dark:odd:bg-opacity-20"
              >
                {fields.map((field) => {
                  const processFunction = field.process
                    ? (process[
                        field.process as keyof typeof process
                      ] as Function)
                    : null;

                  return (
                    <TableCell
                      key={`item-${item.id}-key-${field.label}`}
                      className={cn(
                        `text-${field.position ?? "center"}`,
                        field.class
                      )}
                    >
                      {processFunction
                        ? processFunction(evalProperty(item, field.key))
                        : evalProperty(item, field.key)}
                    </TableCell>
                  );
                })}

                {displayActions && (
                  <TableCell>
                    <div className="flex flex-row gap-2 justify-end my-auto">
                      {displayActions &&
                        actions.map((action, index) => (
                          <Tooltip key={index + 1}>
                            <TooltipTrigger asChild>
                              <Button
                                variant={"info"}
                                size={"xs"}
                                onClick={() => action.onClick?.(item)}
                              >
                                {action.element}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>{action.title}</TooltipContent>
                          </Tooltip>
                        ))}
                      {!item.hideAction && editPath && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={editPath.replace("[id]", item.id)}
                              passHref
                            >
                              <Button variant={"warning"} size={"xs"}>
                                <EditIcon />
                              </Button>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>{t("crud.edit")}</TooltipContent>
                        </Tooltip>
                      )}
                      {!item.hideAction && actionDelete && (
                        <Tooltip>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <TooltipTrigger asChild>
                                <Button variant={"destructive"} size={"xs"}>
                                  <TrashIcon />
                                </Button>
                              </TooltipTrigger>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  {t("crud.deleteConfirmation")}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  {t("crud.deleteMessage", {
                                    title: item.title,
                                  })}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>
                                  {t("crud.cancel")}
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(item)}
                                >
                                  {t("crud.continue")}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <TooltipContent>{t("crud.delete")}</TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <GenericPagination page={page} total={total} lastPage={lastPage} />
      </div>
    </Loading>
  );
}
