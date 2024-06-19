"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useJsonInput } from "@/hooks/useJsonInput";
import { useCallback, useEffect, useRef, useState } from "react";

import { importPKCS8, SignJWT } from "jose";
import { TimePickerDemo } from "@/components/ui/time-picker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EllipsisVerticalOutline } from "@raresail/react-ionicons";

const signingAlgorithms = {
  symmetric: ["HS256", "HS384", "HS512"],
  asymmetric: ["RS256", "RS384", "RS512", "PS256", "PS384", "PS512"],
} as const;

type JWTAlgorithms =
  (typeof signingAlgorithms)[keyof typeof signingAlgorithms][number];

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
  algorithm: JWTAlgorithms = "HS256",
  expireAt?: Date
) => {
  const secretKey = signingAlgorithms.asymmetric.includes(algorithm as any)
    ? await importPKCS8(secret, algorithm)
    : Buffer.from(secret);

  const jwt = new SignJWT(payload)
    .setProtectedHeader({ alg: algorithm, typ: "JWT" })
    .setIssuedAt();

  if (expireAt) {
    jwt.setExpirationTime(expireAt);
  }

  return await jwt.sign(secretKey);
};

export default function JwtGenerate() {
  const [algorithm, setAlgorithm] = useState<JWTAlgorithms>("HS256");
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

    generateJWT(payload, secret, algorithm, getExpirationDate(duration)).then(
      (jwt) => {
        if (cancelled) return;

        setJWT(jwt);
      }
    );

    return () => {
      cancelled = true;
    };
  }, [payload, secret, algorithm, duration]);

  return (
    <section className="px-5 grid gap-4">
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

      <section className="flex gap-2">
        <section className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="algorithm">Algorithm</Label>
            <Select
              name="algorithm"
              value={algorithm}
              onValueChange={(value) => setAlgorithm(value as JWTAlgorithms)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select an algorithm" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(signingAlgorithms).map(([key, algorithms]) => (
                  <SelectGroup key={key}>
                    <SelectLabel className="capitalize">{key}</SelectLabel>

                    {algorithms.map((algorithm) => (
                      <SelectItem key={algorithm} value={algorithm}>
                        {algorithm}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Expires in</Label>
            <TimePickerDemo date={duration} setDate={setDuration} />
          </div>
        </section>

        <section className="grid w-full gap-2">
          <Label>Secret</Label>

          {signingAlgorithms.symmetric.includes(algorithm as any) && (
            <Input
              value={secret}
              placeholder="Insert your JWT token secret here"
              onChange={(ev) => setSecret(ev.target.value)}
            />
          )}

          {signingAlgorithms.asymmetric.includes(algorithm as any) && (
            <Textarea
              value={secret}
              rows={10}
              placeholder="Insert your private key (PCKS#8) here"
              onChange={(ev) => setSecret(ev.target.value)}
            />
          )}

          <span className="text-xs text-zinc-400">
            All actions are done in your computer.
          </span>
        </section>
      </section>

      <EllipsisVerticalOutline className="opacity-50 mx-auto" />

      <div className="grid w-full gap-2 mt-4">
        <Label>Generated JWT</Label>
        <Textarea readOnly value={jwt} rows={8} />
      </div>
    </section>
  );
}
