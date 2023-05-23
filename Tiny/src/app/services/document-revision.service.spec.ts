import { TestBed } from '@angular/core/testing';

import { DocumentRevisionService } from './document-revision.service';

describe('DocumentRevisionService', () => {
  let service: DocumentRevisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentRevisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
