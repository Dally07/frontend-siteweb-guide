import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HommeComponent } from './homme/homme.component';
import { GuideComponent } from './guide/guide.component';
import { MapComponent } from './map/map.component';
import { AboutComponent } from './about/about.component';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { Router } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { ApiService } from './api.service';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';







@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HommeComponent, GuideComponent, MapComponent, AboutComponent, NavbarComponent, AdminComponent, LoginComponent, FooterComponent, RouterOutlet, HttpClientModule],
  providers: [ApiService, AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, AuthService ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isLoginPage: boolean = false;
  isAdminpage: boolean = false;

  
  image1 = 'assets/Dec 2 - 20.jpg'
  image2 = 'assets/IMG_5254-768X1024.jpg'
  image3 = 'assets/IMG_20230705_131609.jpg'
  image4 = 'assets/IMG_20230704_131038.jpg'
  image5 = 'assets/madagascar-fall.jpg'





  isLoggedIn: boolean = false;


  constructor(private router: Router){
  
  }

  ngOnInit(){
    this.router.events.subscribe((event) =>{
      if (event instanceof NavigationEnd){
        this.isLoginPage = event.url === '/login';
        this.isAdminpage = event.url === '/admin';
      }
    })
  }



  
}


