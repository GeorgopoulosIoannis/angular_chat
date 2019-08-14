import { TestBed, async, inject } from '@angular/core/testing';

import { CurrentTabGuard } from './current-tab.guard';

describe('CurrentTabGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentTabGuard]
    });
  });

  it('should ...', inject([CurrentTabGuard], (guard: CurrentTabGuard) => {
    expect(guard).toBeTruthy();
  }));
});
