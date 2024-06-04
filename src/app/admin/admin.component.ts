import { AfterViewInit, Component, ElementRef, OnInit, viewChild} from '@angular/core';
import { CommonModule, } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { parse } from 'path';
import { error, time } from 'console';
import { response } from 'express';
import { jwtDecode } from 'jwt-decode';
import { File } from 'buffer';
import { AuthGuard } from '../auth.guard';
import { verify } from 'crypto';
import { Chart, Scale } from 'chart.js';


export interface  informations{
  idInformation: number;
  titreInfo: string;
  corpsInfo: string;
  date: Date ;
  imageData: String;
  userId: number;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})



export class AdminComponent implements OnInit, AfterViewInit {

 
 
  isSidebarHidden = false ;

  infoFormModel = {
    titreInfo : '',
    corpsInfo: ''
  };
  selectedImage: any = null;
  generatedImage: string | null=null;

 
  constructor (private readonly apiService: ApiService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authGuard: AuthGuard
    ) {this.userId = parseInt(this.activatedRoute.snapshot.paramMap.get('userId') || '0');}
  userId: number;
  dapartementId: number | null=null;
  userInfo: any;
 
  informationList: informations[] = [];
  editIndex: number | null=null;
  editedItem: any = {};
  

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

    ngAfterViewInit(): void {
      this.createChart();
    }

    createChart(): void {
      const canvas = document.getElementById('myChart') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');

      

     if  (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['jan','feb', 'mar'],
          datasets: [{
            label: 'Information ajouter par jours',
            data: [20,56,48],
            fill: true,
            borderColor: 'red',
            pointRadius: 5,
            pointHoverRadius: 10,
            },
          {
            label: 'serie B',
            data: [20,56,48],
            borderColor: 'red',
            pointRadius: 5,
            pointHoverRadius: 10,
            fill: true,
          }
          ]
          
          },
          options: {
            responsive: true,
            scales: {
              x: {
                beginAtZero: true,
              },
              y: {
                beginAtZero: true,
              }
            }
          },
      })
     } else {
      console.error('tsy hita')
     }
    }
  


    private getinfo() {
      this.apiService.getInformation(this.userId).subscribe((data: informations[]) => {
        this.informationList = data;
        
      })
    }
    





  //create information
 async onSubmit() {
const formData = new FormData();
formData.append('titreInfo' , this.infoFormModel.titreInfo);
formData.append('corpsInfo' , this.infoFormModel.corpsInfo);
if (this.selectedImage) {
  formData.append('imageData', this.selectedImage);
}


const tokens = localStorage.getItem('acces_token');


if (tokens) {
  try {
  const decode: any = jwtDecode(tokens);
  this.userId = decode.sub;

        if (this.userId) {
            formData.append('userId', this.userId.toString());
           }

  console.log(tokens);
  formData.forEach((value, key) => {
    console.log(key + ':' + value);
  }) 

  const response = await this.apiService.createInformation(formData, tokens).toPromise();
  console.log('voici ',response)
 
  
} catch(error) {
  console.error()
} 
}else {
  alert('token not found');
}
  }
  



  // vider une formulaire
  clearForm(){
    this.infoFormModel = {
      titreInfo: '',
      corpsInfo: ''

    }
    this.selectedImage = null;
  }




  // delete information
  onDelete (id: number): void {
    const confirmDelete = confirm(`etes vous sur de supprimer l'information ?`)
    console.log();
    if (confirmDelete){
      this.apiService.deleteInformation(id).subscribe(
        () => {
          this.informationList = this.informationList.filter(item => item.idInformation !== id);
          alert(`Information  supprimer avec succes`)
        },
      )
    }
  }

  onEdit(index: number, item: any) {
    this.editIndex = index;
    this.editedItem = {...item};
  }

  onSave(item: any) {
    this.apiService.updateInformation(item.idInformation, this.editedItem).subscribe(response => {
      Object.assign(item, this.editedItem);
      this.editIndex = null;
    })
  }


  logout(): void {
   localStorage.removeItem('acces_token');
   this.apiService.singOut();
  }


  //image
  handleImageChange(event: any): void {
    const file =event.target.files?.[0];


  

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





