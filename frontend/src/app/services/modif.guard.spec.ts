import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { modifGuard } from './modif.guard';

describe('modifGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => modifGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
