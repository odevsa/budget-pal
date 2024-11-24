import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const wait = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export const generateWhere = (
  q: string,
  fields: string[]
): Record<string, any> => {
  const where = {} as any;
  if (q && fields.length > 0)
    where["OR"] = [...fields.map((field) => ({ [field]: { contains: q } }))];
  return where;
};

export const generateOrderBy = (
  sort: string,
  order: string
): Record<string, any>[] => {
  return sort
    .split(",")
    .filter((item) => !!item)
    .map((item) => ({ [item.trim()]: order.trim() }));
};
