import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { error } from 'console';
import { informations } from './admin/admin.component';
import { response } from 'express';
import { map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string = 'http://localhost:3000/user';
  apiInfo: string = 'http://localhost:3000/information';

  constructor(private readonly http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.apiUrl}`);
  }

  loginUser(userData: any) {
    return this.http.post(`${this.apiUrl}/login`, userData)
    .pipe(
      catchError(error => {
        console.error(`erreur de connection de l'utilisateur :`,error)
        return throwError(error);
      })
    );
  }

  getInformation() {
    return this.http.get(`${this.apiInfo}`).pipe(
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
    return this.http.delete(`${this.apiInfo}, ${id}` ).pipe(
      catchError ( error => {
        console.error(`erreur de la creation de l'information :`,error)
        return throwError(error);
      })
    )
  }
}


