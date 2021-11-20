import { TestBed } from '@angular/core/testing';

import { EndowmentService } from './endowment.service';

describe('EndowmentService', () => {
  let service: EndowmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndowmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
