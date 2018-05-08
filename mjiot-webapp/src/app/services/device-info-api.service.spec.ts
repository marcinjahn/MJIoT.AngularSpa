import { TestBed, inject } from '@angular/core/testing';

import { DeviceInfoApiService } from './device-info-api.service';

describe('DeviceInfoApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceInfoApiService]
    });
  });

  it('should be created', inject([DeviceInfoApiService], (service: DeviceInfoApiService) => {
    expect(service).toBeTruthy();
  }));
});
