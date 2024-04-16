import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private apiService: ApiService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {

    if (this.apiService.isLoggedIn()) {
      
      const hasAdminRole = this.apiService.hasAdminRole(); 
      if (hasAdminRole) {
        return true; 
      } else {
        this.router.navigate(['/unauthorized']); 
        return false;
      }
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  }
}
