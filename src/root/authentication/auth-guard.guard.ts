import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  tokenKey: string = "tokenKey";
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userData: any = sessionStorage.getItem('userData');
    let existingToken = JSON.parse(userData);
    if (existingToken === null || existingToken === undefined) {
      this.router.navigate(['account/login']);
      return false;
    }
    return true;

  }

}