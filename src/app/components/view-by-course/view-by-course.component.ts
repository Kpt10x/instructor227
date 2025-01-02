import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-by-course',
  standalone: true,
  templateUrl: './view-by-course.component.html',
  styleUrls: ['./view-by-course.component.css'],
  imports: [FormsModule, CommonModule, HttpClientModule],
})
export class ViewByCourseComponent implements OnInit {
  instructors: any[] = [];
  filteredInstructors: any[] = [];
  courses: string[] = [];
  selectedCourse: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('assets/data/instructors.json').subscribe((data) => {
      this.instructors = data;
      this.filteredInstructors = data;

      // Collect unique courses (trim spaces to avoid mismatches)
      this.courses = [
        ...new Set(data.map((instructor) => instructor.course.trim())),
      ];
    });
  }

  filterByCourse(): void {
    if (this.selectedCourse) {
      this.filteredInstructors = this.instructors.filter(
        (instructor) => instructor.course.trim() === this.selectedCourse
      );
    } else {
      this.filteredInstructors = this.instructors;
    }
  }
}
