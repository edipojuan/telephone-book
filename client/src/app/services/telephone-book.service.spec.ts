import { TestBed, inject } from '@angular/core/testing';

import { TelephoneBookService } from './telephone-book.service';

describe('TelephoneBookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TelephoneBookService]
    });
  });

  it('should be created', inject([TelephoneBookService], (service: TelephoneBookService) => {
    expect(service).toBeTruthy();
  }));
});
