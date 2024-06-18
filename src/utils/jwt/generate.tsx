"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useJsonInput } from "@/hooks/useJsonInput";
import { useCallback, useEffect, useRef, useState } from "react";

import { SignJWT } from "jose";
import { TimePickerDemo } from "@/components/ui/time-picker";

const getExpirationDate = (date: Date) => {
  if (
    date.getHours() === 0 &&
    date.getMinutes() === 0 &&
    date.getSeconds() === 0
  ) {
    return;
  }

  // add hours, minutes, seconds
  const now = new Date();

  now.setHours(now.getHours() + date.getHours());
  now.setMinutes(now.getMinutes() + date.getMinutes());
  now.setSeconds(now.getSeconds() + date.getSeconds());

  return now;
};

const generateJWT = async (
  payload: Record<string, any>,
  secret: string,
  expireAt?: Date
) => {
  const secretKey = Buffer.from(secret);

  const jwt = new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt();

  if (expireAt) {
    jwt.setExpirationTime(expireAt);
  }

  return await jwt.sign(secretKey);
};

export default function JwtGenerate() {
  const [secret, setSecret] = useState("");
  const [input, setInput] = useState("");
  const [payload, setPayload] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [jwt, setJWT] = useState<string>("");
  const [duration, setDuration] = useState<Date>(
    new Date("1970-01-01T00:00:00")
  );

  const validatePayload = useCallback(() => {
    setPayload(null);
    setError(null);

    if (!input) return;

    try {
      const out = JSON.parse(input);
      setPayload(out);
    } catch {
      setPayload(null);
      setError("Invalid payload JSON");
    }
  }, [input]);

  const payloadRef = useRef<HTMLTextAreaElement>(null);

  useJsonInput(payloadRef);

  useEffect(() => {
    if (!payload || !secret) return;

    let cancelled = false;

    generateJWT(payload, secret, getExpirationDate(duration)).then((jwt) => {
      if (cancelled) return;

      setJWT(jwt);
    });

    return () => {
      cancelled = true;
    };
  }, [payload, secret, duration]);

  return (
    <section className="px-5 grid gap-4">
      <div className="grid w-full gap-2">
        <Label>Secret</Label>
        <Input
          value={secret}
          placeholder="Insert your JWT token secret here"
          onChange={(ev) => setSecret(ev.target.value)}
        />
        <span className="text-xs text-zinc-400">
          All actions are done in your computer.
        </span>
      </div>

      <div className="grid w-full gap-2">
        <Label>Payload</Label>

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Textarea
          value={input}
          placeholder="Insert your JWT payload here"
          rows={10}
          onBlur={validatePayload}
          onChange={(ev) => setInput(ev.target.value)}
          ref={payloadRef}
        />
      </div>

      <section>
        <div className="grid w-full gap-2">
          <Label>Expires in</Label>
          <TimePickerDemo date={duration} setDate={setDuration} />
        </div>
      </section>

      <div className="grid w-full gap-2 mt-4">
        <Label>Generated JWT</Label>
        <Textarea readOnly value={jwt} />
      </div>
    </section>
  );
}
