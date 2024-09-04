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
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-homme',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule, FooterComponent, NavbarComponent],
  templateUrl: './homme.component.html',
  styleUrl: './homme.component.css'
})
export class HommeComponent {
  image1 = 'assets/Dec 2 - 20.jpg'
  image2 = 'assets/IMG_5254-768X1024.jpg'
  image3 = 'assets/IMG_20230705_131609.jpg'
  image4 = 'assets/IMG_20230704_131038.jpg'
  image5 = 'assets/madagascar-fall.jpg'
  image6 = 'assets/valbio.jpg'


  isSidebarHidden = true ;

 

  constructor (private readonly apiService: ApiService, 
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
    ) {this.userId = parseInt(this.activatedRoute.snapshot.paramMap.get('userId') || '0');}
  userId: number;
  dapartementId: number | null=null;
  userInfo: any;

  informationList: informations[] = [];
  searchTerm: string = '';
  lastinformation: any = null;
  titreInfo: string | undefined;
  corpsInfo: string | undefined;
  
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
    this.loadlastInfo();
     }


     private getinfo() {
      this.apiService.getInformation(this.userId).subscribe((data: informations[]) => {
        this.informationList = data;
      })
    }


    onSearch(event: Event): void {
      const inputElement = event.target as HTMLInputElement;
      this.searchTerm = inputElement.value;
      this.searchInformation(this.searchTerm);
    }
  
    onSearchClick(): void {
      this.searchInformation(this.searchTerm);
    }
  
    searchInformation(term: string): void {
      if (term) {
        this.apiService.getSearchInfo(term).subscribe(data => {
          this.informationList = data;
        });
      } else {
        this.getinfo();
      }
    }


    loadlastInfo(): void {
      this.apiService.getLastInfo().subscribe(data => {
        console.log('dta:', data)
        this.titreInfo = data.titreInfo;
        this.corpsInfo = data.corpsInfo;
        console.log('dta:', this.titreInfo)
        console.log('dta:', this.corpsInfo)
      })
    }

    onInformationCLick(item: informations): void {
      this.titreInfo = item.titreInfo;
      this.corpsInfo = item.corpsInfo;
    }

}

