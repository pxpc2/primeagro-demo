"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({ children, pendingText, ...props }) {
  const { pending, action } = useFormStatus();

  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    setIsPending(true);
    await props.formAction();
    setIsPending(false);
  };

  return (
    <button
      {...props}
      type="submit"
      aria-disabled={pending || isPending}
      onClick={handleClick}
    >
      {isPending ? pendingText : children}
    </button>
  );
}
