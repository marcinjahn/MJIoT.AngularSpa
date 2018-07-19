import { TestBed, inject } from '@angular/core/testing';

import { BooleanHistoryDataFetcher } from './boolean-history-data-fetcher.service';

describe('PropertiesApiHistoryDataHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BooleanHistoryDataFetcher]
    });
  });

  it('should be created', inject([BooleanHistoryDataFetcher], (service: BooleanHistoryDataFetcher) => {
    expect(service).toBeTruthy();
  }));
});
