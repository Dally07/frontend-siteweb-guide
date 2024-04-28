import { Component } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { parse } from 'path';
import { error } from 'console';
import { response } from 'express';

export interface  informations{
  titreInfo: string;
  corpsInfo: string;
  date: Date ;
  userId: number;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})



export class AdminComponent {
 
  isSidebarHidden = false ;
  selectedImage: string | null=null;
  generatedImage: string | null=null;

 
  constructor (private readonly apiService: ApiService, 
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {this.userId = parseInt(this.activatedRoute.snapshot.paramMap.get('userId') || '0');}
  userId: number;
  dapartementId: number | null=null;
  userInfo: any;
  informationList: informations[] = [];
  infoForm: informations =  {
    titreInfo: '',
    corpsInfo: '',
    date: new Date(),
    userId: 0
  }

  currentPage: string = 'accueil';
  
  toggleSideBar(){
    this.isSidebarHidden = !this.isSidebarHidden;
    document.getElementById('sidebar')?.classList.toggle('active')
}
  // navigation
  goToPage(page: string) {
    this.currentPage = page;
  }

  isCurrentPage(page: string): boolean {
    return this.currentPage === page;
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
    





  //create information
  onSubmit() {
    if (this.infoForm.titreInfo && this.infoForm.corpsInfo) {
      const newInformation : informations = {
        titreInfo: this.infoForm.titreInfo,
        corpsInfo: this.infoForm.corpsInfo,
        date: new Date(),
        userId: 0
      };
      this.apiService.createInformation(newInformation).subscribe
      ({
        next: (response: any) => {
          console.log(response);
          const informations = response.informations
            console.log(`information creer` ,informations);
            this.informationList.push(informations);
            this.clearForm();
            
        },
        error: (error) => {
          alert(`erreur de creation`)
        }
      }
        
      );
    } else {
      alert(`veuillez remplir toutes les champs`);
    }
  }



  // vider une formulaire
  clearForm(){
    this.infoForm = {
      titreInfo: '',
      corpsInfo: '',
      date: new Date(),
      userId: 0

    }
  }




  // delete information
  deleteInformation (id: number) {
    const confirmDelete = confirm(`etes vous sur de supprimer l'information ?`)
    if (confirmDelete){
      this.apiService.deleteInformation(id).subscribe(
        () => {
          //this.informationList = this.informationList.filter(item => item. !== this.infoForm)
          alert(`Information  supprimer avec succes`)
        },
      )
    }
  }


  logout(): void {
   localStorage.removeItem('acces_token');
   this.apiService.singOut();
  }


  //image
  handleImageChange(event: Event) {
    const file =(event.target as HTMLInputElement)?.files?.[0];


  

  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;
    };
    reader.readAsDataURL(file);
  }   
  }

  async generateImage(): Promise<void> {
    
  }


  }





