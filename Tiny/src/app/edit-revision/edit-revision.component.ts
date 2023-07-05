import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chapter } from '../model/response-model';
import { DocumentRevisionService } from '../services/document-revision.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-revision',
  templateUrl: './edit-revision.component.html',
  styleUrls: ['./edit-revision.component.css']
})
export class EditRevisionComponent implements OnInit {

  public buttonText = 'Save changes';

  @Input() chapters: Array<Chapter> = new Array<Chapter>();
  @Output() acceptChanges: EventEmitter<any> = new EventEmitter();

  private insertedFootnoteIds = new Map<any, any>();

  @Input() documentContent: string | undefined;
  @Input() reviseEntireDocument: boolean | undefined;

  constructor(protected documentRevisionService: DocumentRevisionService,
    protected dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(`EditRevisionComponent, in ngOnInit.`)
  }

  removeFootnoteById(id: any, editorContent: any) {
    console.log(`removing footnote with id ${id} from DOM`);
    var strId = id as string;
    if(strId) {
      var fnNumber = strId.split('_')[1];
      var liElementIdentifier = `footnotes_entry_${fnNumber}`;
      const domParser = new DOMParser();
      const htmlElement = domParser.parseFromString(editorContent, 'text/html');
      const liElement = htmlElement?.querySelector('#' + liElementIdentifier);

      console.log(`li element to remove: ${liElement?.outerHTML}`);
    }
  }

  openDialog(message: string, title: string, htmlElement: HTMLElement | null, editorContent: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: message,
        title: title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {

        this.removeFootnoteById(htmlElement?.id, editorContent);

        this.documentRevisionService.getCompleteDocumentForRevision(this.chapters[0].documentId).subscribe((result: any) => {
          if (result) {
            console.log(`complete document = ${result.composedContent}`);
            this.documentContent = result.composedContent;
            this.reviseEntireDocument = true;
          }
        }, (error: any) => {
          console.error(`error while fetching complete document for revision, error = ${error}`);
        });
      }

    });

  }

  public onAcceptChanges() {
    const numberOfObservers = this.acceptChanges.observers.length;
    console.log(`acceptChanges has ${numberOfObservers} observers.`);
    this.acceptChanges.emit(true);
  }

  public onCancel() {
    this.acceptChanges.emit(false);
  }

  public onCommandExecuted($event: any) {
    console.log(`command = ${$event.event.command}, value = ${$event.event.value}`);
    if ($event.event.command === 'mceInsertContent') {
      let content = $event.event.value.content;
      console.log(`inserted content = ${content}`);

      if (content.startsWith('<sup')) {
        const domParser = new DOMParser();
        const htmlElement = domParser.parseFromString(content, 'text/html');
        const supElement = htmlElement.querySelector('sup');
        this.insertedFootnoteIds.set(supElement?.id, supElement);

        var editorContent = $event.editor.getContent();

        console.log(`editor content: ${editorContent}`);

        this.openDialog('Do you want to append the footnote anywhere else in the document?', 'Insertion of footnote detected', supElement, editorContent);
      }

    }
  }

  public onChangeExcecuted($event: any) {
    console.log($event.editor.model);
  }
}
