import { TestBed } from '@angular/core/testing';

import { FirestorageServiceService } from './firestorage-service.service';

describe('FirestorageServiceService', () => {
  let service: FirestorageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestorageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
