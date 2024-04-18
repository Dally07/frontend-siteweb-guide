import {  Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { informations } from './admin/admin.component';
import { map, throwError } from 'rxjs';






@Injectable({
  providedIn: 'root'
})

export class ApiService {

  apiUrl: string = 'http://localhost:3000/auth';
  apiInfo: string = 'http://localhost:3000/information';

  constructor(private readonly http: HttpClient
   ) { }


  // for user
  getUsers() {
    return this.http.get(`${this.apiUrl}`);
  }

  loginUser(userData: any): Observable<boolean> {
    return this.http.post<{token_type: string, access_token: string}>(`${this.apiUrl}/login`, userData)
    .pipe(
      map(response => {
        if (response.token_type === 'Bearer' && response.access_token ) {
       
        localStorage.setItem('access_token', response.access_token);
        return true;
        } else {
          return false;
        }
       
      }),
      catchError (error => {
        console.error('connection error', error);
        return throwError(error);
      })
      
    );
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


