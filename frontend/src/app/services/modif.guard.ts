import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { inject } from '@angular/core';

export const modifGuard: CanActivateFn = (route, state) => {
  const tokenStorage = inject(TokenStorageService);
  const router = inject(Router);

  const user = tokenStorage.getUser();

  if(tokenStorage.getToken() && parseInt(route.paramMap.get('id') || '0') == user.ID) {  //If connected to the corresponding ID
    return true;
  }
  else if(tokenStorage.getToken()) {  //If connected but the link doesn't correspond
    return router.navigate(['/usermodif',user.ID]);
  }
  else {
    return router.navigate(['']);
  }
};
