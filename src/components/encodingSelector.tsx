"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type EncodingSelectorProps = {
  value?: BufferEncoding;
  onSelect?: (value: BufferEncoding) => void;
  defaultValue?: BufferEncoding;
  placeholder?: string;
};

export const EncodingSelector = ({
  placeholder,
  value,
  onSelect,
  defaultValue = "utf8",
}: EncodingSelectorProps) => {
  return (
    <Select defaultValue={defaultValue} value={value} onValueChange={onSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="ascii">ASCII</SelectItem>
        <SelectItem value="utf8">UTF-8</SelectItem>
        <SelectItem value="utf16le">UTF-16 LE</SelectItem>
      </SelectContent>
    </Select>
  );
};
