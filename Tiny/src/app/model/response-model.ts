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
