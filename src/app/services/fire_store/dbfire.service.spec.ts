import { TestBed } from '@angular/core/testing';

import { DBfireService } from './dbfire.service';

describe('DBfireService', () => {
  let service: DBfireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DBfireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
