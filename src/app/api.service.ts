import {  Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { informations } from './admin/admin.component';
import { map, throwError } from 'rxjs';
import { access } from 'node:fs';
import { Router } from '@angular/router';
import { userInfo } from 'node:os';


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


  //logIn
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

// recuperation token pout l'authentification
getjwttoken(token: string): string | null {
  return token;
}





  // for information

  

  //read
  getInformation(userId: number):Observable<informations[]> { 
   return this.http.get<informations[]>('http://localhost:3000/information').pipe();
  }



  //create
  createInformation(formData: FormData): Observable<any> {
   return this.http.post<any>(`http://localhost:3000/information` , formData)
  } 


  
// update
  updateInformation(id: number , updateInformationDto: any) {
    return this.http.patch(`${this.apiInfo}/${id}` , updateInformationDto);
  }


// delete
  deleteInformation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiInfo}/${id}` );
  }

  //dashboard
  getInformationByDepartment(): Observable<any> {
    return this.http.get(`${this.apiInfo}/departement`);
  }

  getInformationByDate(): Observable<any> {
    return this.http.get(`${this.apiInfo}/date`);
  }
 

  //logOut
singOut(): void { 
  this.router.navigate(['/login'])
}

}




