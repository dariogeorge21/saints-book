"use client";

import React from "react";
import { SaintReader } from "@/app/saints/[id]/saint-reader";
import type { SaintStoryBundle } from "@/app/saints/[id]/types";
import { Saint } from "@/lib/content";

export interface SaintChronicleReaderProps {
  saint: Saint;
  prevSaint: Saint | null;
  nextSaint: Saint | null;
  stories?: SaintStoryBundle;
}

/**
 * Backward-compatible wrapper for SaintReader.
 * If stories are not provided, it initializes an empty bundle and lets SaintReader
 * fall back gracefully to the saint's indexed paragraphs.
 */
export function SaintChronicleReader({
  saint,
  prevSaint,
  nextSaint,
  stories = {},
}: SaintChronicleReaderProps) {
  return (
    <SaintReader
      saint={saint}
      stories={stories}
      prevSaint={prevSaint}
      nextSaint={nextSaint}
    />
  );
}

export { SaintReader };
