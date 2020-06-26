import { TestBed } from '@angular/core/testing';

import { MypostsService } from './myposts.service';

describe('MypostsService', () => {
  let service: MypostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MypostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
