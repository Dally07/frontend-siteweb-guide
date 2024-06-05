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
import { AuthService } from '../auth.service';
import { DepartmentData, DateData } from '../models';


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



export class AdminComponent implements OnInit {

  pieChart: any;
  lineChart: any;
  //totalTechnologyInfo: number;

  isSidebarHidden = false ;

  infoFormModel = {
    titreInfo : '',
    corpsInfo: '',
    imageData: null
  };
  selectedImage: string | ArrayBuffer | null = null;
  generatedImage: string | null=null;

 
  constructor (private readonly apiService: ApiService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authGuard: AuthGuard,
    private authService: AuthService
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
  
   this.apiService.getInformationByDepartment().subscribe((departmentData: DepartmentData[]) => {
    const departmentLabels = departmentData.map(item => item.department);
    const departmentCounts = departmentData.map(item => item.count);

    this.pieChart = new Chart('pieCanvas', {
      type: 'pie',
      data: {
        labels: departmentLabels,
        datasets: [
          {
            data: departmentCounts,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF'
            ]
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });
  });

  this.apiService.getInformationByDate().subscribe((dateData: DateData[]) => {
    const dateLabels = dateData.map(item => item.date);
    const dateCounts = dateData.map(item => item.count);

    this.lineChart = new Chart('lineCanvas', {
      type: 'line',
      data: {
        labels: dateLabels,
        datasets: [
          {
            data: dateCounts,
            borderColor: '#36A2EB',
            fill: false,
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day'
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });
}

  
  


    private getinfo() {
      this.apiService.getInformation(this.userId).subscribe((data: informations[]) => {
        this.informationList = data;
        
      })
    }
    





  //create information
  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = new FormData();
      formData.append('titreInfo', this.infoFormModel.titreInfo);
      formData.append('corpsInfo', this.infoFormModel.corpsInfo);
      if (this.infoFormModel.imageData) {
        formData.append('image', this.infoFormModel.imageData);
      }

      this.apiService.createInformation(formData).subscribe(response => {
        console.log('Information added successfully:', response);
        this.clearForm(form);
      }, error => {
        console.error('Error adding information:', error);
      });
    }
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

  
  // vider une formulaire
  clearForm(form: NgForm){
    form.reset();
    this.selectedImage = null;
    this.infoFormModel.imageData = null

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


 
  async generateImage(): Promise<void> {
    
  }




  }





