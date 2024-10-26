import { Component, OnInit} from '@angular/core';
import { CommonModule, } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { Chart, Scale, PieController, TimeScale } from 'chart.js/auto';
import { AuthService } from '../auth.service';
import { format } from 'date-fns';


export interface  informations{
  idInformation: number;
  titreInfo: string;
  corpsInfo: string;
  date: Date ;
  imageData: String;
  userId: number;
}

export interface DepartmentData{
  nomDepartement: string;
  nombre_informations: number;
}


export interface DateData {
  date_information: Date;
  nombre_information: number;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})



export class AdminComponent implements OnInit {

  pieCanvas: any;
  lineCanvas: any;
  //totalTechnologyInfo: number;
  totalInformations: number = 0;
  totalUsers: number = 0;
  totalInformationsByUser: number | undefined;
  CurrentUsername: string = '';

  isSidebarHidden = false ;

  infoFormModel = {
    titreInfo : '',
    corpsInfo: '',
    imageData: null
  };
  selectedImage: string | ArrayBuffer | null = null;
  generatedImage: string | null=null;
  image1 = 'assets/CVB.ico'

 
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
  
  this.createPieChart();
  this.createLinechart();
  
  this.userId = parseInt(this.activatedRoute.snapshot.paramMap.get('userId') || '0');
  this.loadTotals();
  this.getinfo();
  this.getinfoByUSER();
  
}

//dashboard



loadTotals(): void {
  this.userId = this.userId;
  console.log(this.userId);

  this.apiService.getTotalInformations().subscribe(total => {
    console.log('total info', total);
    this.totalInformations = total;
    
  });

  this.apiService.getTotalUsers().subscribe(total => {
    console.log('info', total);
    this.totalUsers = total;
  });

 this.apiService.getTotalInformationsByUser(this.userId).subscribe(total => {
  console.log('infouser', total);  
  this.totalInformationsByUser = total;
  });
 
 
  this.CurrentUsername = this.apiService.getCurrentUsername();
  
};



createPieChart(){
  this.apiService.getInformationByDepartment().subscribe((data: DepartmentData[]) => {
    const departmentLabels = data.map(item => item.nomDepartement);
    const departmentCounts = data.map(item => item.nombre_informations);

    this.pieCanvas = new Chart('pieCanvas', {
      type: 'pie',
      data: {
        labels: departmentLabels,
        datasets: [
          {
            data: departmentCounts,
            backgroundColor: [
              '#2E86C1',
              '#F39C12',
              '#28B463',
              '#E74C3C',
              '#8E44AD'
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
 }


 createLinechart(){
  this.apiService.getInformationByDate().subscribe((dateData: DateData[]) => {
    const dateLabels = dateData.map(item => format(new Date( item.date_information), 'dd/MM/yyyy'));
    const dateCounts = dateData.map(item => item.nombre_information);

    this.lineCanvas = new Chart('lineCanvas', {
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
      }
    });
  });
 }


 private getRandomColors(numColors: number): string[] {
  return Array.from({length: numColors}, () => {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  });
 }

 private getinfo() {
  this.apiService.getInformation(this.userId).subscribe((data: informations[]) => {
    this.informationList = data;
    
  })
}

private getinfoByUSER() {
  this.apiService.getInformationbyuser(this.userId).subscribe(data => {
    console.log('userTotalInfo', data)
    this.totalInformationsByUser = data;
    
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





