import { EncodingSelector } from "@/components/encodingSelector";
import { useState } from "react";

export const useEncoding = () => {
  const [encoding, setEncoding] = useState<BufferEncoding>("utf8");

  return {
    encoding,
    setEncoding,
    EncodingSelector: () => (
      <EncodingSelector value={encoding} onSelect={setEncoding} />
    ),
  };
};
