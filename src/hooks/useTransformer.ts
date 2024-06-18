import { useState } from "react";
import { useDebounce } from "react-use";

type Transformer = (value: string) => string;

export const useTransformer = <T extends Record<string, Transformer>>(
  transformers: T,
  defaultAction: keyof T,
  deps: any[] = [],
  delay = 100
) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [action, setAction] = useState(defaultAction);

  useDebounce(
    () => {
      setOutput(transformers[action](input));
    },
    delay,
    [transformers, input, action, ...deps]
  );

  return {
    input,
    output,
    action,

    setAction,
    setInput,
    setOutput,
  };
};
