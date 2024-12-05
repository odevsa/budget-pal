import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { boolean } from "zod";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const wait = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export const getString = (
  data: FormData,
  fields: string
): string | undefined => {
  let value: any = (data.get(fields) as string).trim();
  if (!value) return;
  return value;
};

export const getNumber = (
  data: FormData,
  fields: string
): number | undefined => {
  let value: any = (data.get(fields) as string).trim();
  if (isNaN(value) || isNaN(parseFloat(value))) return;
  return parseFloat(value);
};

export const getBoolean = (data: FormData, fields: string): boolean => {
  return !!(data.get(fields) as string).trim();
};

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
