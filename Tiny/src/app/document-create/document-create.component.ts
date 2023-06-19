import { Component, EventEmitter, Output } from '@angular/core';
import { DocumentSplittingOptions } from '../model/enum';
import { DocumentRevisionService } from '../services/document-revision.service';

@Component({
  selector: 'app-document-create',
  templateUrl: './document-create.component.html',
  styleUrls: ['./document-create.component.css']
})
export class DocumentCreateComponent {

  public selectedSplittingOption: DocumentSplittingOptions = DocumentSplittingOptions.Page;
  public fileName = '';
  public title = '';
  public fileUploaded = false;
  public numberOfChapters: number = 0;
  public revision = 1;

  @Output() fileUploadedEvent = new EventEmitter<boolean>();

  constructor(private documentRevisionService: DocumentRevisionService) {
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
          this.fileUploadedEvent.emit(true);
        },
        (error) => {
          console.log(`error while uploading document, error code: ${error}`);
          this.fileUploadedEvent.emit(false);
        }
      );
    }
  }

}
