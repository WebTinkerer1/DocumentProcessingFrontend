import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pipe } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { DocumentRevisionService } from '../services/document-revision.service';
import { Chapter } from '../model/response-model';
import { DocumentSplittingOptions } from '../model/enum';

interface DocumentSplittingOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-start-revision',
  templateUrl: './start-revision.component.html',
  styleUrls: ['./start-revision.component.css']
})
export class StartRevisionComponent {

  public fileName = '';
  public title = '';
  public revision = 1;
  public fileUploaded = false;
  public isUnderRevision = false;
  public numberOfChapters: number = 0;
  public chaptersToRevise: any;
  public chapters: Array<Chapter> = new Array<Chapter>();
  public selectedSplittingOption: DocumentSplittingOptions = DocumentSplittingOptions.Page;

  constructor(private documentRevisionService: DocumentRevisionService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  onFileSelected($event: any) {

    const file: File = $event.target.files[0];

    if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("files", file);

      console.log(`selectedSplittingOption=${this.selectedSplittingOption}`);

      this.documentRevisionService.uploadDocument(formData, this.title, this.revision, this.selectedSplittingOption).subscribe(
        (result) => {
          this.fileUploaded = true;
          this.numberOfChapters = result.numberOfChapters;
          console.log(`document upload for revision was successful, # of chapters found: ${result.numberOfChapters}`);
        },
        (error) => {
          console.log(`error while uploading document, error code: ${error}`);
        }
      );
    }
  }

  startDocumentRevision() {
    // request chapters from backend:
    this.documentRevisionService.getChaptersForRevision(this.title, this.revision, this.chaptersToRevise).subscribe((result: Chapter[]) => {

      if(result) {
        this.isUnderRevision = true;
        this.chapters = result;
        console.log(`successfully loaded chapters for document: ${this.title}, # of chapters loaded: ${this.chapters.length}`);
      }
    },
    (error) => {
      console.log(`error = ${error}`);
    });
  }

  onAcceptChanges($event: any) {
    console.log(`onAcceptChanges, $event=${$event}`);

    if($event === false) {
      this.isUnderRevision = false;
      return;
    }

    // update document on server:
    this.documentRevisionService.updateChapters(this.chapters).subscribe((result: any) => {
      if (result) {
        console.log(`document chapters updated successfully.`);
        this.isUnderRevision = false;
      }
    }, (error: any) => {
      console.log('error: ' + error);
    });
  }
}
