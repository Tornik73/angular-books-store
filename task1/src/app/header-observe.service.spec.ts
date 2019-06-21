import { TestBed } from '@angular/core/testing';

import { HeaderObserveService } from './header-observe.service';

describe('HeaderObserveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeaderObserveService = TestBed.get(HeaderObserveService);
    expect(service).toBeTruthy();
  });
});
