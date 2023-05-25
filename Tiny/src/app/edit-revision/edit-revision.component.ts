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

  constructor() { }

  ngOnInit(): void {
    console.log(`EditRevisionComponent, in ngOnInit.`)
  }

  public onAcceptChanges() {
    this.acceptChanges.emit(true);
  }

  public onCancel() {
    this.acceptChanges.emit(false);
  }
}
