import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const CONTENT_ROOT = path.resolve(process.cwd(), "content");

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".gif": "image/gif",
};

/**
 * GET /api/content/[...path]
 *
 * Secure static asset delivery route for content-driven media (e.g. saint portraits & historical photos).
 * Preserves the architectural principle that the `content/` folder is the single source of truth.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params;

  if (!segments || segments.length === 0) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // Prevent directory traversal attacks
  const hasTraversal = segments.some(
    (seg) => seg.includes("..") || seg.includes("/") || seg.includes("\\")
  );
  if (hasTraversal) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const resolvedPath = path.resolve(CONTENT_ROOT, ...segments);

  // Enforce boundary within content directory
  if (!resolvedPath.startsWith(CONTENT_ROOT)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    const fileStat = await fs.stat(resolvedPath);
    if (!fileStat.isFile()) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const ext = path.extname(resolvedPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    const fileBuffer = await fs.readFile(resolvedPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: unknown) {
    const err = error as NodeJS.ErrnoException;
    if (err.code === "ENOENT") {
      return new NextResponse("Not Found", { status: 404 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
