"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export function SubmitButton({ children, ...props }) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <Button {...props} type="submit" aria-disabled={pending}>
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>{" "}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
