import { Component, Input, OnInit } from '@angular/core';
import { DocumentRevisionService } from '../services/document-revision.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Document } from '../model/response-model'

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  private _chaptersToRevise: any;

  @Input() document: Document | undefined;
  chapters: any;
  isUnderRevision = false;

  constructor(private documentProcessingService: DocumentRevisionService,
              private location: Location ) { }

  ngOnInit(): void {
    if(this.document) {
      this.documentProcessingService.getDocumentById(this.document.id).subscribe(doc => {
        console.log(`fetched document by id, number of chapters: ${doc.chapters.length}`);
        this.document = doc;
      });
    }
  }

  goBack() {
    this.location.back();
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
      this.documentProcessingService.getChaptersForRevision(this.document?.title, 1, this.chaptersToRevise).subscribe(chapters =>
        {
          this.chapters = chapters;
          this.isUnderRevision = true;
        });
     }
  }

  onAcceptChanges($event: any) {
    console.log(`DocumentDetailComponent, onAcceptChanges, $event=${$event}`);
    this.isUnderRevision = false;
    // update document on server:
    this.documentProcessingService.updateChapters(this.chapters).subscribe( result => {
      if (result) {
        console.log(`document chapters updated successfully.`);
        this.isUnderRevision = false;
      }
    });
  }
}
