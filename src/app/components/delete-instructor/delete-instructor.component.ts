import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-instructor',
  standalone: true,
  templateUrl: './delete-instructor.component.html',
  styleUrls: ['./delete-instructor.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class DeleteInstructorComponent implements OnInit {
  instructors: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadInstructors();
  }

  loadInstructors(): void {
    this.http.get<any[]>('http://localhost:3000/instructors').subscribe((data) => {
      this.instructors = data;
    });
  }

  //deleteInstructor(id: number): void {
   // if (confirm('Are you sure you want to delete this instructor?')) {
    // this.instructors = this.instructors.filter((instructor) => instructor.id !== id);
    //  alert('Instructor deleted successfully!');
 //  }
 // }
 deleteInstructor(id: number): void {
  if (confirm('Are you sure you want to delete this instructor?')) {
    this.http.delete(`http://localhost:3000/instructors/${id}`).subscribe({
      next: () => {
        this.instructors = this.instructors.filter((instructor) => instructor.id !== id);
        alert('Instructor deleted successfully!');
      },
      error: (err) => {
        console.error('Error deleting instructor:', err);
        alert('Failed to delete the instructor. Please try again.');
      },
    });
  }
}
 
}
