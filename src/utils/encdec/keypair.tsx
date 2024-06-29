"use client";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  SelectItem,
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { exportPKCS8, exportSPKI, generateKeyPair } from "jose";
import { useCallback, useEffect, useState } from "react";

const Algorithms = [
  "RS256",
  "RS384",
  "RS512",
  "PS256",
  "PS384",
  "PS512",
] as const;
type Algorithm = (typeof Algorithms)[number];

export default function GenerateSecret() {
  const [publicKey, setPublic] = useState("");
  const [privateKey, setPrivate] = useState("");
  const [algorithm, setAlgorithm] = useState<Algorithm>("PS256");

  const generateKey = useCallback(async () => {
    const { publicKey, privateKey } = await generateKeyPair(algorithm, {
      extractable: true,
    });

    setPublic(await exportSPKI(publicKey));
    setPrivate(await exportPKCS8(privateKey));
  }, [algorithm]);

  useEffect(() => {
    generateKey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algorithm]);

  return (
    <Container>
      <section className="flex gap-2 items-end">
        <div className="flex flex-col gap-2">
          <Label htmlFor="algorithm">Algorithm</Label>
          <Select
            name="algorithm"
            value={algorithm}
            onValueChange={(value) => setAlgorithm(value as Algorithm)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select an algorithm" />
            </SelectTrigger>
            <SelectContent>
              {Algorithms.map((name) => (
                <SelectGroup key={name}>
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={generateKey}>Regenerate</Button>
      </section>

      <section className="flex flex-wrap gap-2">
        <div className="flex flex-col gap-2 flex-grow">
          <Label htmlFor="public">Public Key (SPKI)</Label>
          <Textarea name="public" value={publicKey} rows={32} />
        </div>

        <div className="flex flex-col gap-2 flex-grow">
          <Label htmlFor="private">Private Key (PCKS#8)</Label>
          <Textarea name="private" value={privateKey} rows={32} />
        </div>
      </section>
    </Container>
  );
}
