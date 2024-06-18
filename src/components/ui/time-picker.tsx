"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "./time-picker-input";

interface TimePickerDemoProps {
  date: Date | undefined;
  setDate: (date: Date) => void;
}

export function TimePickerDemo({ date, setDate }: TimePickerDemoProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
        <Label htmlFor="hours" className="text-xs">
          Hours
        </Label>
      </div>
      <div className="grid gap-1 text-center">
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
        />
        <Label htmlFor="minutes" className="text-xs">
          Minutes
        </Label>
      </div>
      <div className="grid gap-1 text-center">
        <TimePickerInput
          picker="seconds"
          date={date}
          setDate={setDate}
          ref={secondRef}
          onLeftFocus={() => minuteRef.current?.focus()}
        />
        <Label htmlFor="seconds" className="text-xs">
          Seconds
        </Label>
      </div>
    </div>
  );
}
