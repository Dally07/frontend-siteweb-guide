import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string = 'http://localhost:3000/user';

  constructor(private readonly http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.apiUrl}`);
  }

  loginUser(userData: any) {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }
}
