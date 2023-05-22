import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentChaptersComponent } from './document-chapters.component';

describe('DocumentChaptersComponent', () => {
  let component: DocumentChaptersComponent;
  let fixture: ComponentFixture<DocumentChaptersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentChaptersComponent]
    });
    fixture = TestBed.createComponent(DocumentChaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
