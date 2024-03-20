import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.css'
})
export class GuideComponent {

}
