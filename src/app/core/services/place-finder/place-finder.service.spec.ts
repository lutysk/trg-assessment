import { TestBed } from '@angular/core/testing';

import { PlaceFinderService } from './place-finder.service';

describe('PlaceFinderService', () => {
  let service: PlaceFinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceFinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
