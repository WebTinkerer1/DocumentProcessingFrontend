export interface Document {
  id: number;
  title: string;
  revision: number;
  rawContent: any;
}

export interface Chapter {
  id: number;
  content: string;
  documentId: number;
  document: Document;
}

export interface Footnote {
  id: number;
  content: string;
  chapterId: number;
  chapter: Chapter;
}
