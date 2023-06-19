import { Component, OnInit } from '@angular/core';
import { DocumentRevisionService } from '../services/document-revision.service';
import { Document } from '../model/response-model';
import { ViewMode } from '../model/enum';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit{

  documents: Document[] = [];
  selectedDocument: Document | undefined;

  viewMode: ViewMode = ViewMode.Overview;
  viewModeEnum: typeof ViewMode = ViewMode;
  selectedDocumentId: any = 0;

  constructor(private documentRevisonService: DocumentRevisionService) {
  }

  ngOnInit(): void {
    this.loadDocumentList();
  }

  private loadDocumentList() {
    this.documentRevisonService.getAllDocuments().subscribe(documents => this.documents = documents);
  }

  onCreateDocument() {
    this.viewMode = ViewMode.CreateDocument;
  }

  onShowDetails(id: any) {
    console.log(`showing details for ${id}`);
    this.selectedDocumentId = id;
    this.viewMode = ViewMode.DocumentDetails;

    this.selectedDocument = this.documents.find(d => d.id === id);
  }

  fileUploadFinished($event: any) {
    this.loadDocumentList();
    this.viewMode = ViewMode.Overview;
  }

  revisionFinished($event: any) {
    this.loadDocumentList();
    this.viewMode = ViewMode.Overview;
  }

}
