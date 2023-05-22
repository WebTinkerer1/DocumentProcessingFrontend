import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRevisionComponent } from './edit-revision.component';

describe('EditRevisionComponent', () => {
  let component: EditRevisionComponent;
  let fixture: ComponentFixture<EditRevisionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRevisionComponent]
    });
    fixture = TestBed.createComponent(EditRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
