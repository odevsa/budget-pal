import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const wait = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export const evalProperty = (data: any, key: string): any => {
  return key.split(".").reduce((obj, prop) => obj?.[prop], data);
};

export const getString = (
  data: FormData,
  fields: string
): string | undefined => {
  const value: any = data.get(fields) as string;
  if (!value) return;
  return value.trim();
};

export const getDate = (data: FormData, fields: string): Date | undefined => {
  const value: any = data.get(fields) as string;
  if (!value) return;

  try {
    return new Date(value);
  } catch {
    return;
  }
};

export const getNumber = (
  data: FormData,
  fields: string
): number | undefined => {
  const value: any = data.get(fields) as string;
  if (isNaN(value) || isNaN(parseFloat(value))) return;
  return parseFloat(value.trim());
};

export const getBoolean = (data: FormData, fields: string): boolean => {
  return !!(data.get(fields) as string);
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
