import React from "react";
import { Button } from "./button";
import Link from "next/link";

type Props = {
  text: string;
  btnLabel: string;
  btnAction: (() => void) | string;
};
const ErrorUI = (p: Props) => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
      <p className="text-xl mb-2">{p.text}</p>
      {typeof p.btnAction == "string" ? (
        <Link href={p.btnAction}>
          <Button>{p.btnLabel}</Button>
        </Link>
      ) : (
        <Button onClick={p.btnAction}>{p.btnLabel}</Button>
      )}
    </div>
  );
};

export default ErrorUI;
