import { TestBed } from '@angular/core/testing';

import { SectionManagerService } from './section-manager.service';

describe('SectionManagerService', () => {
  let service: SectionManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
