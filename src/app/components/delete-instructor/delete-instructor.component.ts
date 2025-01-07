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
  instructorsApiUrl = 'http://localhost:3000/instructors';
  profilesApiUrl = 'http://localhost:3000/profiles';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadInstructors();
  }

  loadInstructors(): void {
    this.http.get<any[]>(this.instructorsApiUrl).subscribe((data) => {
      this.instructors = data;
    });
  }

  deleteInstructor(id: number): void {
    if (confirm('Are you sure you want to delete this instructor?')) {
      this.http.delete(`${this.instructorsApiUrl}/${id}`).subscribe({
        next: () => {
          this.removeInstructorFromProfiles(id);
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

  private removeInstructorFromProfiles(id: number): void {
    this.http.get<any>(this.profilesApiUrl).subscribe((profiles) => {
      const updatedProfiles = {
        ...profiles,
        instructors: profiles.instructors.filter((instructor: any) => instructor.id !== id.toString()),
      };
      this.http.put(this.profilesApiUrl, updatedProfiles).subscribe(
        () => console.log('Instructor profile removed successfully.'),
        (error) => console.error('Error updating profiles:', error)
      );
    });
  }
}
