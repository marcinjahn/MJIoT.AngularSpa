import { TestBed, inject } from '@angular/core/testing';

import { PropertiesApiService } from './properties-api.service';

describe('PropertiesApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropertiesApiService]
    });
  });

  it('should be created', inject([PropertiesApiService], (service: PropertiesApiService) => {
    expect(service).toBeTruthy();
  }));
});
