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
import { HttpClientModule} from '@angular/common/http';







@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HommeComponent, GuideComponent, MapComponent, AboutComponent, NavbarComponent, AdminComponent, LoginComponent, FooterComponent, RouterOutlet, HttpClientModule],
  providers: [ApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isLoginPage: boolean = false;
  isAdminpage: boolean = false;
  isLoggedIn: boolean = false;


  constructor(private router: Router, private apiService: ApiService){
  
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


