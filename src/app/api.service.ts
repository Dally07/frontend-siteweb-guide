import {  Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { informations } from './admin/admin.component';
import { map, throwError } from 'rxjs';
import { access } from 'node:fs';
import { Router } from '@angular/router';
import { userInfo } from 'node:os';
import { DepartmentData } from './models';
import { jwtDecode } from 'jwt-decode';
import { error } from 'node:console';


interface DecodedToken {
  sub: number;
  username: string;
}


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private jwtToken: string | null = null;

  apiUrl: string = 'http://localhost:3000/auth';

  apiInfo: string = 'http://localhost:3000/information';
  

  constructor(private readonly http: HttpClient, private readonly router: Router
   ) { }

   private getDecodedToken(): DecodedToken | undefined {
    const token = localStorage.getItem('acces_token');
    if (token) {
      return jwtDecode<DecodedToken>(token);
    }
    return undefined;
}


  // for user
  getUsers() {
    //return this.http.get(`${this.apiUrl}`);
  }


  //logIn
  loginUser(userData: any) {
    console.log(userData);
    return this.http.post(`${this.apiUrl}/login`, userData)
    .pipe(
      map(response => {
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

  getSearchInfo(departementName: string): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiInfo}/search?departementName=${departementName}`)

  }

getInformationbyuser(userId: number):Observable<number> { 
   return this.http.get<number>(`http://localhost:3000/information/total-informations-by-user/${userId}`);
  }

  getLastInfo(): Observable<any> {
    return this.http.get<any[]>(`${this.apiInfo}/last`)
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

  getTotalInformations(): Observable<number> {
    return this.http.get<number>(`${this.apiInfo}/total-informations`);
  }

  getTotalUsers(): Observable<number> {
    return this.http.get<number>(`${this.apiInfo}/total-users`);
  }

  getTotalInformationsByUser(userId: number) {
    const DecodedToken = this.getDecodedToken();
    if (DecodedToken) {
      const userId = DecodedToken.sub;
      console.log('userId', userId);
      return this.http.get<number>(`${this.apiInfo}/total-informations-by-user/${userId}`);
    } else {
      throw new Error('no token found');
    }
    
    
  }

  getCurrentUsername(): string{
    const DecodedToken = this.getDecodedToken();
    if (DecodedToken) {
      return DecodedToken.username;
    } else {
      throw new Error('no token found');
    }
  }
 

  //logOut
singOut(): void { 
  this.router.navigate(['/login'])
}

}




