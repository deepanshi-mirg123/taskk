import { TestBed } from '@angular/core/testing';

import { EmployeeAccessService } from './employee-access.service';

describe('EmployeeAccessService', () => {
  let service: EmployeeAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
