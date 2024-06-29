"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { EllipsisVerticalOutline } from "@raresail/react-ionicons";
import { useTransformer } from "@/hooks/useTransformer";
import { useChanged } from "@/hooks/useChanged";
import { PageDetail } from "@/lib/navigation";
import { Container } from "@/components/container";

const textToBinary = (text: string) => {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);

  return Array.from(bytes)
    .map((byte) => byte.toString(2).padStart(8, "0"))
    .join(" ");
};

const binaryToText = (binary: string) => {
  const binaryGroups = binary.split(" ");
  const byteArray = new Uint8Array(binaryGroups.map((bin) => parseInt(bin, 2)));
  const decoder = new TextDecoder();

  return decoder.decode(byteArray);
};

export default function Binary({ detail }: { detail: PageDetail }) {
  const { input, output, action, setAction, setInput, setOutput } =
    useTransformer(
      {
        encode: (value) => textToBinary(value),
        decode: (value) => binaryToText(value),
      },
      "encode"
    );

  // when action changes
  useChanged(action, () => {
    setOutput(input);
    setInput(output);
  });

  return (
    <Container>
      <section>
        <RadioGroup value={action} className="grid grid-cols-2">
          <Card
            className={cn(
              "w-full cursor-pointer hover:opacity-100 transition-opacity",
              action !== "encode" && "opacity-50"
            )}
            onClick={() => setAction("encode")}
          >
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <RadioGroupItem value="encode" />
                Encode
              </CardTitle>
              <CardDescription>
                Encode text to {detail.title.toLowerCase()} format.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card
            className={cn(
              "w-full cursor-pointer hover:opacity-100 transition-opacity",
              action !== "decode" && "opacity-50"
            )}
            onClick={() => setAction("decode")}
          >
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <RadioGroupItem value="decode" />
                Decode
              </CardTitle>
              <CardDescription>
                Decode {detail.title.toLowerCase()} to text format.
              </CardDescription>
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
            placeholder={`Insert input to ${action}`}
          />
        </div>

        <EllipsisVerticalOutline className="opacity-50" />

        <div className="grid w-full gap-2">
          <Label>Output</Label>
          <Textarea
            onClick={(ev) => (ev.target as HTMLInputElement).select()}
            readOnly
            value={output}
            placeholder="Automatically updates"
          />
        </div>
      </section>
    </Container>
  );
}
