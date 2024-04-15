import { Component } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { error } from 'console';
import { HttpClientModule } from '@angular/common/http';

export interface  informations{
  titreInfo: string;
  corpsInfo: string;
  date: Date ;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})



export class AdminComponent {
  constructor (private readonly apiService: ApiService) {}
  informationList: informations[] = [];
  infoForm: informations =  {
    titreInfo: '',
    corpsInfo: '',
    date: new Date()

  }

  currentPage: string = 'accueil';
  
  goToPage(page: string) {
    this.currentPage = page;
  }

  isCurrentPage(page: string): boolean {
    return this.currentPage === page;
  }


  ngOnInit() {
    this.apiService.getInformation()
    .subscribe(
      (data: any ) => {
        this.informationList = data ;
      },
      (error) => {
        console.error(`erreur de l affichage`, error)
      }
    )
  }


  onSubmit() {
    if (this.infoForm.titreInfo && this.infoForm.corpsInfo) {
      const newInformation : informations = {
        titreInfo: this.infoForm.titreInfo,
        corpsInfo: this.infoForm.corpsInfo,
        date: new Date()
      };
      this.apiService.createInformation(newInformation).subscribe
      (
        (information: informations) => {
          console.log(`information creer` ,information);
          this.informationList.push(information);
          this.clearForm();
        },
        (error) => {
          console.error(`erreur de creation`)
        }
      );
    } else {
      console.error(`veuillez remplir toutes les champs`, error);
    }
  }

  clearForm(){
    this.infoForm = {
      titreInfo: '',
      corpsInfo: '',
      date: new Date()

    }
  }


}


