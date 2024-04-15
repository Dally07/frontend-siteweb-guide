import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,  ReactiveFormsModule,  Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
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
    private readonly router: Router) {}


  

  onSubmit(){
    if (this.loginForm.invalid){
      return;
    }

    const userData = { 
      username: this.loginForm.value.username,
      password : this.loginForm.value.password
    };

    this.apiService.loginUser(userData).subscribe(
      (response: any) => {
        console.log(response);
        //localStorage.setItem('token', response.token);
        this.router.navigate(['/admin']);
      },
      (error) => {
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = 'une erreur est survenue : ' + error.error.message;
        } else {
          this.errorMessage = error.error.message || 'echec de la connection';
        }
      }
    );
    }
  
  
  

}
