import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-all-instructors',
  standalone: true,
  templateUrl: './view-all-instructors.component.html',
  styleUrls: ['./view-all-instructors.component.css'],
  imports: [FormsModule, CommonModule, HttpClientModule],
})
export class ViewAllInstructorsComponent implements OnInit {
  instructors: any[] = [];
  filteredInstructors: any[] = [];
  searchQuery: string = '';
  apiUrl = 'http://localhost:3000/instructors'; // JSON server API endpoint

  isEditing: boolean = false;
  selectedInstructor: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchInstructors();
  }

  /**
   * Fetches instructor data from the backend
   */
  fetchInstructors(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.instructors = data;
        this.filteredInstructors = data;
      },
      (error) => {
        console.error('Error fetching instructors:', error);
      }
    );
  }

  /**
   * Filters instructors based on search query
   */
  filterByDetails(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredInstructors = this.instructors.filter((instructor) => {
      return (
        instructor.name.toLowerCase().includes(query) ||
        instructor.email.toLowerCase().includes(query) ||
        instructor.phone.includes(query)
      );
    });
  }

  /**
   * Enables editing mode for a selected instructor
   */
  editInstructor(instructor: any): void {
    this.isEditing = true;
    this.selectedInstructor = { ...instructor }; // Clone the instructor object
  }

  /**
   * Updates the instructor data
   */
  updateInstructor(): void {
    if (this.selectedInstructor) {
      const updatedInstructor = this.selectedInstructor;
      this.http.put(`${this.apiUrl}/${updatedInstructor.id}`, updatedInstructor).subscribe(
        () => {
          const index = this.instructors.findIndex((inst) => inst.id === updatedInstructor.id);
          if (index > -1) {
            this.instructors[index] = updatedInstructor;
            this.filteredInstructors = [...this.instructors];
          }
          this.cancelEdit();
        },
        (error) => {
          console.error('Error updating instructor:', error);
        }
      );
    }
  }

  /**
   * Cancels the editing mode
   */
  cancelEdit(): void {
    this.isEditing = false;
    this.selectedInstructor = null;
  }
}
