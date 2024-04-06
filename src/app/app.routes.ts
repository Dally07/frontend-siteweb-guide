import { Routes } from '@angular/router';
import { HommeComponent } from './homme/homme.component';
import { GuideComponent } from './guide/guide.component';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    {'path':'', component:HommeComponent},
    {'path':'guide', component:GuideComponent},
    {'path':'map', component:MapComponent},
    {'path':'about', component:AboutComponent},
    {'path':'login', component:LoginComponent},
    {'path':'admin', component:AdminComponent}
];
