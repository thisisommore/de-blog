"use client";

import ErrorUI from "@/components/ui/ErrorUI";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <ErrorUI
      btnLabel="Try again"
      btnAction={reset}
      text="Something went wrong"
    />
  );
}
