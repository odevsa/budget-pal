"use client";

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
import { EditIcon, TrashIcon } from "lucide-react";

export default function GenericList({
  data = [],
  fields = { id: "#", title: "Title" },
  onEdit,
  onDelete,
}: Readonly<{
  data: any[];
  fields?: object;
  onEdit?(item: any): void;
  onDelete?(item: any): void;
}>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Object.values(fields).map((title) => (
            <TableHead key={title}>{title}</TableHead>
          ))}
          {(onEdit || onDelete) && (
            <TableHead className="text-right">Actions</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={`item-${item.id}`}>
            {Object.keys(fields).map((key) => (
              <TableCell key={`item-${item.id}-key-${key}`}>
                {item[key]}
              </TableCell>
            ))}

            {(onEdit || onDelete) && (
              <TableCell className="flex flex-row gap-2 justify-end">
                {onEdit && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"warning"}
                        size={"xs"}
                        onClick={() => onEdit(item)}
                      >
                        <EditIcon />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit item</TooltipContent>
                  </Tooltip>
                )}
                {onDelete && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant={"destructive"} size={"xs"}>
                            <TrashIcon />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete confirmation
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete "{item.title}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDelete(item)}>
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TooltipTrigger>
                    <TooltipContent>Delete item</TooltipContent>
                  </Tooltip>
                )}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
