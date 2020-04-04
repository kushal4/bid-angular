import { TestBed } from '@angular/core/testing';

import { AdminBidService } from './admin-bid.service';

describe('AdminBidService', () => {
  let service: AdminBidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminBidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
