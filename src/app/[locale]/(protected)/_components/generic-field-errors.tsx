"use client";

import { useTranslations } from "next-intl";

export interface GenericFieldErrorsProps {
  errors?: string[];
}

const GenericFieldErrors = ({ errors = [] }: GenericFieldErrorsProps) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col space-y-1.5">
      {errors.map((error) => (
        <span key={error} className="text-destructive font-bold text-xs">
          {t.has(error) ? t(error) : error}
        </span>
      ))}
    </div>
  );
};

export default GenericFieldErrors;
