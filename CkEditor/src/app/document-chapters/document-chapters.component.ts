import { Component, ViewChild } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent, ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';


@Component({
  selector: 'app-document-chapters',
  templateUrl: './document-chapters.component.html',
  styleUrls: ['./document-chapters.component.css']
})
export class DocumentChaptersComponent {

  public Editor = ClassicEditor;

  public contentParagraph1: string = '<p>Paragraph1</p>';
  public contentParagraph2: string = '<p>Paragraph2</p>';
  public contentParagraph3: string = '<p>Paragraph3</p>';

  public buttonText = 'Save changes';

  constructor() { }

  public get joinedDocumentText(): string {
    return this.contentParagraph1 + this.contentParagraph2 + this.contentParagraph3;
  }

  public joinDocumentContent() {
      console.log(`joinedDocContent=${this.joinedDocumentText}`);
  }
}
