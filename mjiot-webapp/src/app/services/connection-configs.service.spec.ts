import { TestBed, inject } from '@angular/core/testing';

import { ConnectionConfigsService } from './connection-configs.service';

describe('ConnectionConfigsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConnectionConfigsService]
    });
  });

  it('should be created', inject([ConnectionConfigsService], (service: ConnectionConfigsService) => {
    expect(service).toBeTruthy();
  }));
});
