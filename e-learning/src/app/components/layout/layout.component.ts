import { Component, OnInit } from '@angular/core';
import { CourService } from '../../services/cour.service';
import { Cour } from '../../Modeles/cour';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  cours: Cour[] = [];

  constructor(private serviceCour: CourService) { }
  ngOnInit(): void {
    this.getAllCourses()
  }
  getAllCourses(): void {
    this.serviceCour.getAllCours().subscribe({
      next: (data: any) => {
        this.cours = data;
        console.log('List of courses', this.cours);
      },
      error: (error: any) => {
        console.error('Error fetching courses', error);
      }
    });
  }
}
