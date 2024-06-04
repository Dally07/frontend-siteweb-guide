import { Injectable } from "@angular/core";
import { mapToCanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from "@angular/router";
import { ApiService } from "./api.service";
import { jwtDecode } from "jwt-decode";
import { error } from "console";
import { Token } from "@angular/compiler";



@Injectable({
    providedIn: 'root'
})


export class AuthGuard implements CanActivate {
    constructor (private apiService: ApiService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const tokens =  route.queryParams['token'];
        if (tokens) {
            
            return true;
           
        } else {
            this.router.navigate(['/login']);
        return false;
        }
        

}
}