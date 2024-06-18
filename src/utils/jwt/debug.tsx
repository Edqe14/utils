"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

const validateJWT = (input: string) => {
  if (!input) return "Input is required";

  // check if it's a valid JWT
  const parts = input.split(".");
  if (parts.length !== 3) return "Invalid JWT token";

  try {
    JSON.parse(Buffer.from(parts[0], "base64").toString("utf8"));
    JSON.parse(Buffer.from(parts[1], "base64").toString("utf8"));

    return null;
  } catch (error) {
    return "Invalid JWT token";
  }
};

const parseJWT = (jwt: string) => {
  const parts = jwt.split(".");
  const header = JSON.parse(Buffer.from(parts[0], "base64").toString("utf8"));
  const payload = JSON.parse(Buffer.from(parts[1], "base64").toString("utf8"));
  const signature = parts[2];

  return { header, payload, signature };
};

export default function JwtDebug() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [parsed, setParsed] = useState<ReturnType<typeof parseJWT> | null>(
    null
  );

  useEffect(() => {
    setError(null);

    if (!input) return;

    const validate = validateJWT(input);
    if (validate) {
      setError(validate);
      return;
    }

    setParsed(parseJWT(input));
  }, [input]);

  return (
    <section className="px-5 grid gap-4">
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid w-full gap-2">
        <Label>JWT</Label>
        <Textarea
          value={input}
          placeholder="Paste your JWT token here"
          onChange={(ev) => setInput(ev.target.value)}
        />
        <span className="text-sm text-zinc-400">
          All actions are done in your computer.
        </span>
      </div>

      <section className="grid grid-cols-3 gap-2 mt-4">
        <div className="grid gap-2">
          <Label>Header</Label>
          <Textarea
            rows={15}
            value={parsed ? JSON.stringify(parsed?.header, null, 2) : ""}
          />
        </div>

        <div className="grid gap-2">
          <Label>Payload</Label>
          <Textarea
            value={parsed ? JSON.stringify(parsed?.payload, null, 2) : ""}
            rows={15}
          />
        </div>

        <div className="grid gap-2">
          <Label>Signature</Label>
          <Textarea value={parsed ? parsed.signature : ""} rows={15} />
        </div>
      </section>
    </section>
  );
}
