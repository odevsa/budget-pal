"use client";

import { useEffect, useState } from "react";
import GenericDatePicker from "../../_components/generic-date-picker";
import GenericSearch from "../../_components/generic-search";
import { isValid, parse } from "date-fns";

export default function TransactionsFilters({
  q,
  transactedAt,
}: Readonly<{ q?: string; transactedAt?: string }>) {
  const [internalTransactedAt, setInternalTransactedAt] = useState<Date>();

  useEffect(() => {
    if (!transactedAt) {
      setInternalTransactedAt(undefined);
      return;
    }

    const parsedTransactedAt = parse(transactedAt, "yyyy-MM-dd", new Date());
    setInternalTransactedAt(
      isValid(parsedTransactedAt) ? parsedTransactedAt : undefined
    );
  }, [transactedAt]);

  return (
    <GenericSearch q={q}>
      <GenericDatePicker name="transactedAt" value={internalTransactedAt} />
    </GenericSearch>
  );
}
