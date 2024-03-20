import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HommeComponent } from './homme/homme.component';
import { GuideComponent } from './guide/guide.component';
import { MapComponent } from './map/map.component';
import { AboutComponent } from './about/about.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminComponent } from './admin/admin.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HommeComponent, GuideComponent, MapComponent, AboutComponent, NavbarComponent, AdminComponent,  RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}


