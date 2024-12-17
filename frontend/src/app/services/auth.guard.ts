import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenStorage = inject(TokenStorageService);
  const router = inject(Router);

  if(!tokenStorage.getToken()) {  //If not connected
    return true;
  }
  else {
    return router.navigate(['/']);
  }
};
