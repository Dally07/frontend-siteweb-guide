import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup,  ReactiveFormsModule,  Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';
import { response } from 'express';
import { error } from 'console';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {
  loginForm: FormGroup = new FormGroup({
  username: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required)
});

errorMessage: string = '';


  constructor(private readonly apiService: ApiService , 
    private readonly router: Router,
   
    ) {}


  

  onSubmit(){
    if (this.loginForm.invalid){
      return;
    }

    const userData = { 
      username: this.loginForm.value.username,
      password : this.loginForm.value.password
    };

    this.apiService.loginUser(userData).subscribe({
      next: (response: any) => {
        console.log(response);
        const token = response;
            
    localStorage.setItem('acces_token' , JSON.stringify(token));


        
     
       this.router.navigate(['/admin'], {queryParams: {token}});
        
      },
      error: (error) => {
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = 'une erreur est survenue:' + error.error.message;
        } else {
          this.errorMessage = error.error.message || 'echec de la conection'
        }
      }
    }
      );
    }
  
  
  

}
