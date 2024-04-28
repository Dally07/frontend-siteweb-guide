import {  Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { informations } from './admin/admin.component';
import { map, throwError } from 'rxjs';
import { access } from 'node:fs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private jwtToken: string | null = null;

  apiUrl: string = 'http://localhost:3000/auth';

  apiInfo: string = 'http://localhost:3000/information';
  

  constructor(private readonly http: HttpClient, private readonly router: Router
   ) { }


  // for user
  getUsers() {
    //return this.http.get(`${this.apiUrl}`);
  }

  loginUser(userData: any) {
    return this.http.post(`${this.apiUrl}/login`, userData)
    .pipe(
      map(response => {
        console.log(response);
        return response;
        
       
      }),
      catchError (error => {
        console.error('connection error', error);
        return throwError(error);
      })
      
    );
  }


  // protection de route
 isLoggedIn(): boolean {
  return  this.jwtToken !== null;
}

getjwttoken(): string | null {
  return this.jwtToken;
}





  // for information
  getInformation(userId: number):Observable<informations[]> {
   return this.http.get<informations[]>('http://localhost:3000/information').pipe()
  ;
  }

  createInformation(informationData: any): Observable<informations> {

    return this.http.post<any>(`http://localhost:3000/information` , informationData).pipe(
      map((response: any) => {
        console.log(response);
        return {
          titreInfo: response.titreInfo,
          corpsInfo: response.corpsInfo,
          date: response.date,
          userId: response.userId,
          ImageData: response.imageData
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
        console.error(`erreur de la  de l'information :`,error)
        return throwError(error);
      })
    )
  }

 
singOut(): void {
  
  this.router.navigate(['/login'])
}






}




