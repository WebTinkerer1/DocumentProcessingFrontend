import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-revision',
  templateUrl: './edit-revision.component.html',
  styleUrls: ['./edit-revision.component.css']
})
export class EditRevisionComponent {

  public contentParagraph1: any = '<p>Paragraph 1</p>';
  public contentParagraph2: any = '<p>Paragraph 2</p>';
  public contentParagraph3: any = '<p>Paragraph 3</p>';

  public buttonText = 'Save changes';

  constructor() { }

  public get joinedDocumentText(): string {
    return this.contentParagraph1 + this.contentParagraph2 + this.contentParagraph3;
  }

  public set joinedDocumentText(newValue: string) {
    console.log(newValue);
  }

  public joinDocumentContent() {
    console.log(`joinedDocContent=${this.joinedDocumentText}`);
  }
}
