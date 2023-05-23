import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartRevisionComponent } from './start-revision.component';

describe('StartRevisionComponent', () => {
  let component: StartRevisionComponent;
  let fixture: ComponentFixture<StartRevisionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartRevisionComponent]
    });
    fixture = TestBed.createComponent(StartRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
