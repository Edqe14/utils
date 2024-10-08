"use client";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  SelectItem,
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { exportJWK, generateSecret } from "jose";
import { useCallback, useEffect, useState } from "react";

const Algorithms = ["HS256", "HS384", "HS512"] as const;
type Algorithm = (typeof Algorithms)[number];

export default function GenerateSecret() {
  const [jwk, setJWK] = useState("");
  const [algorithm, setAlgorithm] = useState<Algorithm>("HS256");

  const generateJwk = useCallback(async () => {
    const newJwk = await exportJWK(
      await generateSecret(algorithm, { extractable: true })
    );

    setJWK(newJwk.k!);
  }, [algorithm]);

  useEffect(() => {
    generateJwk();
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

        <Button onClick={generateJwk}>Regenerate</Button>
      </section>

      <Textarea value={jwk} />
    </Container>
  );
}
