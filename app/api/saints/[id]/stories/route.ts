import { NextRequest, NextResponse } from "next/server";
import { getSaintSummary, type ContentLanguage, type StoryKind } from "@/lib/content";
import { getSaintStory, getCompleteSaint } from "@/lib/content-server";

/**
 * GET /api/saints/[id]/stories
 *
 * Query parameters:
 * - `lang`: "en" | "ml" | "hi" (optional)
 * - `kind`: "shortStory" | "longStory" (optional)
 *
 * Architecture:
 * - Content folder is the single source of truth for all stories.
 * - content/index.json maps the paths.
 * - This endpoint fetches the raw markdown from the content files and delivers it to the client.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const saintSummary = getSaintSummary(id);

  if (!saintSummary) {
    return NextResponse.json(
      { error: `Saint chronicle with id "${id}" not found.` },
      { status: 404 }
    );
  }

  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") as ContentLanguage | null;
  const kind = searchParams.get("kind") as StoryKind | null;

  // Single story request: e.g. /api/saints/st-alphonsa/stories?lang=ml&kind=longStory
  if (lang && kind) {
    const story = await getSaintStory(id, lang, kind);

    if (!story) {
      return NextResponse.json(
        { error: `Story not found for ${id} in ${lang} (${kind}).` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id,
      language: lang,
      kind,
      content: story,
    });
  }

  // Complete bundle request: returns all stories in all languages
  const completeSaint = await getCompleteSaint(id);

  if (!completeSaint) {
    return NextResponse.json(
      { error: `Could not load chronicle bundle for ${id}.` },
      { status: 500 }
    );
  }

  return NextResponse.json({
    id,
    profile: completeSaint.profile,
    stories: completeSaint.stories,
  });
}
