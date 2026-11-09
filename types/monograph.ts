export type Category = 
  | "ALL"
  | "ARCHITECTURE"
  | "TYPOGRAPHY"
  | "CONTEMPORARY ART"
  | "ARCHIVAL THEORY"
  | "CRITICISM";

export interface Monograph {
  id: string;
  catalogNumber: string;
  title: string;
  subtitle: string;
  category: Category;
  year: number;
  season: string;
  author: string;
  authorRole: string;
  readTime: string;
  abstract: string;
  excerpt: string;
  pullQuote: string;
  editionDetails: {
    pages: number;
    format: string;
    isbn: string;
    curator: string;
    stock: "AVAILABLE" | "LIMITED ARCHIVE" | "VAULT ONLY";
  };
  chapters: {
    number: string;
    title: string;
    content: string;
  }[];
  accentGlow: string;
}

export interface BrandColor {
  name: string;
  role: string;
  hex: string;
  rgb: string;
  description: string;
  usage: string;
}
