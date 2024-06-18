"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useDebounce } from "react-use";
import { EllipsisVerticalOutline } from "@raresail/react-ionicons";

export default function Base64() {
  const [tab, setTab] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useDebounce(
    () => {
      if (tab === "encode") {
        return setOutput(btoa(input));
      }

      if (tab === "decode") {
        return setOutput(atob(input));
      }
    },
    100,
    [input]
  );

  const currentTab = useRef(tab);

  useEffect(() => {
    // check tab change
    if (tab !== currentTab.current) {
      currentTab.current = tab;

      const tempOutput = output;
      setOutput(input);
      setInput(tempOutput);
    }
  }, [tab, input, output]);

  return (
    <section className="px-5 grid gap-4">
      <section>
        <RadioGroup value={tab} className="grid grid-cols-2">
          <Card
            className={cn(
              "w-full cursor-pointer hover:opacity-100 transition-opacity",
              tab !== "encode" && "opacity-50"
            )}
            onClick={() => setTab("encode")}
          >
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <RadioGroupItem value="encode" />
                Encode
              </CardTitle>
              <CardDescription>Encode text to base64 format.</CardDescription>
            </CardHeader>
          </Card>

          <Card
            className={cn(
              "w-full cursor-pointer hover:opacity-100 transition-opacity",
              tab !== "decode" && "opacity-50"
            )}
            onClick={() => setTab("decode")}
          >
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <RadioGroupItem value="decode" />
                Decode
              </CardTitle>
              <CardDescription>Decode base64 to text format.</CardDescription>
            </CardHeader>
          </Card>
        </RadioGroup>
      </section>

      <section className="grid place-items-center gap-4">
        <div className="grid w-full gap-2">
          <Label>Input</Label>
          <Textarea
            value={input}
            onChange={(ev) => setInput(ev.target.value)}
            placeholder={`Insert input to ${tab}`}
          />
        </div>

        <EllipsisVerticalOutline className="opacity-50" />

        <div className="grid w-full gap-2">
          <Label>Output</Label>
          <Textarea
            readOnly
            value={output}
            placeholder="Automatically updates"
          />
        </div>
      </section>
    </section>
  );
}
