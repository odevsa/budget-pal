"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditIcon, TrashIcon } from "lucide-react";

export default function GenericList({
  data = [],
  fields = { id: "#", title: "Title" },
  onEdit,
  onDelete,
}: Readonly<{
  data: any[];
  fields?: object;
  onEdit?(id: number): void;
  onDelete?(id: number): void;
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
          <TableRow key={item.id}>
            {Object.keys(fields).map((key) => (
              <TableCell>{item[key]}</TableCell>
            ))}

            {(onEdit || onDelete) && (
              <TableCell className="flex flex-row gap-2 justify-end">
                {onEdit && (
                  <Button
                    variant={"warning"}
                    size={"sm"}
                    onClick={() => onEdit(item.id)}
                  >
                    <EditIcon />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant={"destructive"}
                    size={"sm"}
                    onClick={() => onDelete(item.id)}
                  >
                    <TrashIcon />
                  </Button>
                )}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
