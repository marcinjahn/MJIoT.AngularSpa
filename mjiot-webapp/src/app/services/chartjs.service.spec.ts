import { TestBed, inject } from '@angular/core/testing';

import { ChartjsService } from './chartjs.service';

describe('ChartjsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartjsService]
    });
  });

  it('should be created', inject([ChartjsService], (service: ChartjsService) => {
    expect(service).toBeTruthy();
  }));
});
