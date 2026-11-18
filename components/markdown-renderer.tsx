"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  /**
   * The raw markdown source string to parse and render.
   */
  content: string;
  /**
   * Optional custom wrapper CSS classes.
   */
  className?: string;
}

/**
 * Editorial Markdown Renderer for SaintsBook chronicles.
 *
 * Designed to faithfully render:
 * - Chapter titles and headings (h1, h2, h3)
 * - Typography with rich inline formatting (**bold**, *italics*, strikethrough)
 * - Historical and canonical milestone tables (via remark-gfm)
 * - Blockquotes and sacred sayings
 * - Ordered and unordered lists
 */
export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  if (!content || !content.trim()) {
    return null;
  }

  return (
    <div className={cn("markdown-chronicle space-y-6 text-[#C2BDCE]", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // H1: Top chapter or main document title
          h1: ({ node: _node, ...props }) => (
            <h1
              className="text-2xl sm:text-3xl font-[200] uppercase tracking-[0.14em] text-[#F8F6FA] border-b border-[rgba(194,189,206,0.15)] pb-4 mt-8 mb-6 first:mt-0"
              {...props}
            />
          ),

          // H2: Section / chapter heading with sacred pink accent bar
          h2: ({ node: _node, ...props }) => (
            <h2
              className="text-xl sm:text-2xl font-[200] uppercase tracking-[0.12em] text-[#F8F6FA] mt-10 mb-4 flex items-center gap-2.5 before:content-[''] before:inline-block before:w-1.5 before:h-5 before:bg-[#FF2477] before:rounded-full"
              {...props}
            />
          ),

          // H3: Subsection or milestone title
          h3: ({ node: _node, ...props }) => (
            <h3
              className="text-base sm:text-lg font-[300] tracking-wide text-[#FF2477] mt-8 mb-3"
              {...props}
            />
          ),

          // Paragraphs: Editorial readability with generous line height
          p: ({ node: _node, ...props }) => (
            <p
              className="text-base sm:text-lg font-[300] leading-relaxed sm:leading-loose text-[#C2BDCE] tracking-wide mb-6 transition-colors hover:text-[#F8F6FA]"
              {...props}
            />
          ),

          // Bold: High-contrast emphasis
          strong: ({ node: _node, ...props }) => (
            <strong
              className="font-[600] text-[#F8F6FA] tracking-normal"
              {...props}
            />
          ),

          // Italics: Graceful contemplative styling
          em: ({ node: _node, ...props }) => (
            <em className="italic text-[#F8F6FA]/90" {...props} />
          ),

          // Blockquote: Dedicated monastic reflection style
          blockquote: ({ node: _node, ...props }) => (
            <blockquote
              className="my-6 p-6 rounded-xl bg-[#352741]/50 border-l-2 border-[#FF2477] border-y border-r border-[rgba(194,189,206,0.12)] italic text-base sm:text-lg font-[200] text-[#F8F6FA] leading-relaxed"
              {...props}
            />
          ),

          // Unordered list
          ul: ({ node: _node, ...props }) => (
            <ul
              className="list-disc pl-6 space-y-2 mb-6 text-base sm:text-lg font-[300] text-[#C2BDCE] marker:text-[#FF2477]"
              {...props}
            />
          ),

          // Ordered list
          ol: ({ node: _node, ...props }) => (
            <ol
              className="list-decimal pl-6 space-y-2 mb-6 text-base sm:text-lg font-[300] text-[#C2BDCE] marker:text-[#FF2477]"
              {...props}
            />
          ),

          li: ({ node: _node, ...props }) => <li className="pl-1" {...props} />,

          // Tables: Structured chronological milestones
          table: ({ node: _node, ...props }) => (
            <div className="my-8 overflow-x-auto rounded-xl border border-[rgba(194,189,206,0.15)] bg-[#352741]/40 shadow-inner">
              <table className="w-full text-left text-sm font-[300]" {...props} />
            </div>
          ),

          thead: ({ node: _node, ...props }) => (
            <thead
              className="border-b border-[rgba(194,189,206,0.15)] bg-[#31233b] text-xs font-[200] uppercase tracking-wider text-[#FF2477]"
              {...props}
            />
          ),

          th: ({ node: _node, ...props }) => (
            <th className="px-5 py-3 font-[300]" {...props} />
          ),

          td: ({ node: _node, ...props }) => (
            <td
              className="px-5 py-3 border-t border-[rgba(194,189,206,0.08)] text-[#C2BDCE]"
              {...props}
            />
          ),

          // Divider
          hr: ({ node: _node, ...props }) => (
            <hr
              className="my-8 border-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(194,189,206,0.2)] to-transparent"
              {...props}
            />
          ),

          // Anchor links
          a: ({ node: _node, ...props }) => (
            <a
              className="text-[#FF2477] underline underline-offset-4 decoration-[#FF2477]/40 hover:text-white hover:decoration-[#FF2477] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
