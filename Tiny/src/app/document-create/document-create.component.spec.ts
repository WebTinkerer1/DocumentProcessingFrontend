import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCreateComponent } from './document-create.component';

describe('DocumentCreateComponent', () => {
  let component: DocumentCreateComponent;
  let fixture: ComponentFixture<DocumentCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentCreateComponent]
    });
    fixture = TestBed.createComponent(DocumentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
