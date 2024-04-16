import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { error } from 'console';
import { informations } from './admin/admin.component';
import { response } from 'express';
import { map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string = 'http://localhost:3000/auth';
  apiInfo: string = 'http://localhost:3000/information';

  constructor(private readonly http: HttpClient,
    private jwtHelper: JwtHelperService) { }


  // for user
  getUsers() {
    return this.http.get(`${this.apiUrl}`);
  }

  loginUser(userData: any): Observable<{access_token: string}> {
    return this.http.post<{access_token: string}>(`${this.apiUrl}/login`, userData)
    .pipe(
      map(response => {
        const accessToken = response.access_token;
        localStorage.setItem('access_token', accessToken);
        return response;
      })
    );
  }

  hasAdminRole(): boolean {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      if (decodedToken && decodedToken['roles'] && (decodedToken['roles'].includes('admin') || decodedToken['permission'].includes('manage_admin_page'))) {
        return true;
      }
    
    }
    return false;
  }


  isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token && this.jwtHelper.isTokenExpired(token);
  }




  // for information
  getInformation() {
    return this.http.get(`${this.apiInfo}`, {
    }).pipe(
      catchError ( error => {
        console.error(`erreur de la recuperation de l'information :`,error)
        return throwError(error);
      })
    )
  }

  createInformation(informationData: any): Observable<informations> {
    return this.http.post<any>(`${this.apiInfo}` , informationData).pipe(
      map((response: any) => {
        return {
          titreInfo: response.titreInfo,
          corpsInfo: response.corpsInfo,
          date: response.date
        };
      }),
      catchError ( error => {
        console.error(`erreur de la creation de l'information :`,error)
        return throwError(error);
      })
    );
  }

  updateInformation(id: number , informationData: any) {
    return this.http.patch(`${this.apiInfo}/${id}` , informationData).pipe(
      catchError ( error => {
        console.error(`erreur de la modification de l'information :`,error)
        return throwError(error);
      })
    )
  }

  deleteInformation(id: number) {
    return this.http.delete(`${this.apiInfo}/${id}` ).pipe(
      catchError ( error => {
        console.error(`erreur de la creation de l'information :`,error)
        return throwError(error);
      })
    )
  }
}




//logout () {
  //localStorage.removeItem('access_token');
 // this.router.navigate(['/login'])
//}


