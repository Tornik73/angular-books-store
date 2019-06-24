import { TestBed } from '@angular/core/testing';

import { AdminToolsService } from './admin-tools.service';

describe('AdminToolsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminToolsService = TestBed.get(AdminToolsService);
    expect(service).toBeTruthy();
  });
});
