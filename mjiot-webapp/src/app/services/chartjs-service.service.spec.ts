import { TestBed, inject } from '@angular/core/testing';

import { ChartjsServiceService } from './chartjs-service.service';

describe('ChartjsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartjsServiceService]
    });
  });

  it('should be created', inject([ChartjsServiceService], (service: ChartjsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
