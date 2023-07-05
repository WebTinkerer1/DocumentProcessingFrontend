import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentRevisionService } from '../services/document-revision.service';
import { Chapter, Document, Footnote } from '../model/response-model'

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  private _chaptersToRevise: any;

  @Input() document: Document | undefined;
  @Output() closeDetailsEvent = new EventEmitter();

  chapters: Array<Chapter> = new Array<Chapter>();
  footnotes: Array<Footnote> = new Array<Footnote>();
  isUnderRevision = false;
  reviseEntireDocument = false;
  documentUnderRevision: Document | undefined;

  constructor(private documentProcessingService: DocumentRevisionService) { }

  ngOnInit(): void {
    if(this.document) {
      this.documentProcessingService.getDocumentById(this.document.id).subscribe(doc => {
        console.log(`fetched document by id, number of chapters: ${doc.chapters.length}`);
        this.document = doc;
      });
    }
  }

  goBack() {
    this.closeDetailsEvent.emit();
  }

  public set chaptersToRevise(theChapters: any) {
    console.log(`chaptersToRevise, set: ${theChapters}`)
    this._chaptersToRevise = theChapters;
  }

  public get chaptersToRevise(): any {
    return this._chaptersToRevise;
  }

  startDocumentRevision() {
    console.log(`starting document revision ()...`);
    // Fetch list of chapters we intend to edit:
    if (this.document) {

      if(!this.reviseEntireDocument) {
        this.documentProcessingService.getChaptersForRevision(this.document?.title, 1, this.chaptersToRevise).subscribe(chapters =>
          {
            this.chapters = chapters;
            this.isUnderRevision = true;
          });
      } else {
        this.documentProcessingService.getCompleteDocumentForRevision(this.document?.id).subscribe((doc: Document) => {
          console.log(`document content: ${doc.composedContent}`);
          this.documentUnderRevision = doc;
          this.isUnderRevision = true;
        }, (error: any) => {
          console.error(`error while composing complete document content, ${error}`);
        });
      }
     }
  }

  onAcceptChanges($event: any) {
    console.log(`DocumentDetailComponent, onAcceptChanges, $event=${$event}`);
    // update document on server:
    this.documentProcessingService.updateChapters(this.chapters).subscribe( result => {
      if (result) {
        console.log(`document chapters updated successfully.`);
        this.documentProcessingService.extractFootnotes(this.chapters).subscribe((extractedFootnotes: any) => {
          if(result) {
            console.log(`footnotes extracted: `);
            this.footnotes = extractedFootnotes;
            this.isUnderRevision = false;
            this.footnotes.forEach((footnote, index, footnotes) => {
              console.log(`${footnote.content}`);
            });
          }
        });
      }
    });
  }
}
