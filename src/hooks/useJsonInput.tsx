import { useEffect } from "react";

export const useJsonInput = (ref: React.RefObject<HTMLTextAreaElement>) => {
  useEffect(() => {
    const current = ref.current;

    if (!current) return;

    const handler = (ev: KeyboardEvent) => {
      if (ev.key === "Tab") {
        ev.preventDefault();

        const start = current.selectionStart;
        const end = current.selectionEnd;

        current.value =
          current.value.substring(0, start) +
          "\t" +
          current.value.substring(end);

        current.selectionStart = current.selectionEnd = start + "\t".length;
      }
    };

    current.addEventListener("keydown", handler);

    return () => {
      current.removeEventListener("keydown", handler);
    };
  }, [ref]);
};
