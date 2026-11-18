import type { Saint } from "@/lib/content";

/**
 * Route parameters for the dynamic saint route: /saints/[id]
 */
export interface SaintPageParams {
  params: Promise<{ id: string }>;
}

/**
 * Story formats available for reader display.
 * - `longStory`: Complete biographical chapters with deep editorial narratives, headings, and milestone tables.
 * - `shortStory`: Concise summary narrative ideal for quick reading.
 */
export type StoryFormat = "longStory" | "shortStory";

/**
 * Multilingual raw markdown chronicle bundle for a saint.
 * Maps language code (en, ml, hi) to its respective short and long stories.
 */
export type SaintStoryBundle = Record<
  string,
  {
    shortStory?: string;
    longStory?: string;
  }
>;

/**
 * Props passed to the client-side SaintReader component.
 */
export interface SaintReaderProps {
  /**
   * The current saint profile from the content archive.
   */
  saint: Saint;
  /**
   * Loaded markdown chronicles across all available languages.
   */
  stories: SaintStoryBundle;
  /**
   * Chronological or canonical previous saint (for sequential navigation).
   */
  prevSaint: Saint | null;
  /**
   * Chronological or canonical next saint (for sequential navigation).
   */
  nextSaint: Saint | null;
}
