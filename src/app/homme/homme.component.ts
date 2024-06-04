import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { informations } from '../admin/admin.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { url } from 'inspector';
import { info } from 'console';

@Component({
  selector: 'app-homme',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  templateUrl: './homme.component.html',
  styleUrl: './homme.component.css'
})
export class HommeComponent {
  image1 = 'assets/Dec 2 - 20.jpg'
  image2 = 'assets/IMG_5254-768X1024.jpg'
  image3 = 'assets/IMG_20230705_131609.jpg'
  image4 = 'assets/IMG_20230704_131038.jpg'
  image5 = 'assets/madagascar-fall.jpg'


  isSidebarHidden = false ;

 

  constructor (private readonly apiService: ApiService, 
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
    ) {this.userId = parseInt(this.activatedRoute.snapshot.paramMap.get('userId') || '0');}
  userId: number;
  dapartementId: number | null=null;
  userInfo: any;
  informationList: informations[] = [];
  
  infoForm: informations =  {
    idInformation: 0,
    titreInfo: '',
    corpsInfo: '',
    date: new Date(),
    imageData: '',
    userId: 0
  }



  toggleSideBar(){
    this.isSidebarHidden = !this.isSidebarHidden;
    document.getElementById('sidebar')?.classList.toggle('active')
}

  // read information
  ngOnInit(): void {
    this.userId = parseInt(this.activatedRoute.snapshot.paramMap.get('userId') || '0');
  
    this.getinfo();
     }


     private getinfo() {
      this.apiService.getInformation(this.userId).subscribe((data: informations[]) => {
        this.informationList = data;
      })
    }

}

