import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.css'
})
export class GuideComponent {
  image5 = 'assets/firsttime.PNG'

  constructor () {}

  currentPage: string = 'accueil';
  
  goToPage(page: string) {
    this.currentPage = page;
  }

  isCurrentPage(page: string): boolean {
    return this.currentPage === page;
  }

}
