import { TestBed, inject } from '@angular/core/testing';

import { DatetimeFormatterService } from './datetime-formatter.service';

describe('DatetimeFormatterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatetimeFormatterService]
    });
  });

  it('should be created', inject([DatetimeFormatterService], (service: DatetimeFormatterService) => {
    expect(service).toBeTruthy();
  }));
});
