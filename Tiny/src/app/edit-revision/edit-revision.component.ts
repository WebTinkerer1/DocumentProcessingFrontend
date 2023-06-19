import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chapter } from '../model/response-model';
import { DocumentRevisionService } from '../services/document-revision.service';

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

  constructor(private documentRevisionService : DocumentRevisionService) { }

  ngOnInit(): void {
    console.log(`EditRevisionComponent, in ngOnInit.`)
  }

  public onAcceptChanges() {

    // log all inserted foot notes to console:

    this.chapters.forEach(chapter => {

      // fetch the footnote container for this chapter:
      const domParser = new DOMParser();
      const htmlElement = domParser.parseFromString(chapter.content, 'text/html');
      const footnotesDiv = htmlElement.querySelector('.mce-footnotes');

      console.log(`outer html = ${footnotesDiv?.outerHTML}`);


      const footnotesToUpdate : string[] = [];

      // iterate over foot notes and check if foot note is in current chapter:
      this.insertedFootnoteIds.forEach((value: any, key: any) => {

        const footNoteId = key;
        var footnoteNumber = footNoteId.split('_')[1];
        console.log(`${footnoteNumber}`);

        const selector = 'footnotes_entry_' + footnoteNumber;
        const liElement = footnotesDiv?.querySelector('#' + selector);
        const footnoteContent = liElement?.innerHTML;

        if (footnoteContent) {
          console.log(footnoteContent);
          footnotesToUpdate.push(footnoteContent);
        } else {
          console.log(`footnote with number ` + footnoteNumber + ' was deleted after inserting.');
        }

      });

      this.documentRevisionService.updateFootnotes(chapter.id, footnotesToUpdate).subscribe((result: any) => {

      }, (error: any) => {

      });

    });

    this.acceptChanges.emit(true);
  }

  public onCancel() {
    this.acceptChanges.emit(false);
  }

  public onCommandExecuted($event: any) {
    // if($event.event.command === 'mceInsertFootnote') {
    console.log(`command = ${$event.event.command}, value = ${$event.event.value}`);
    if($event.event.command === 'mceInsertContent') {
      let content = $event.event.value.content;
      console.log(`inserted content = ${content}`);
      if(content.startsWith('<sup')) {
        const domParser = new DOMParser();
        const htmlElement = domParser.parseFromString(content, 'text/html');
        const supElement = htmlElement.querySelector('sup');

        this.insertedFootnoteIds.set(supElement?.id, supElement);
      }
    }
    // }
  }

  public onChangeExcecuted($event: any) {
    console.log($event.editor.model);
  }
}
