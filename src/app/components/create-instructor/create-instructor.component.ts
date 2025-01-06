import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-instructor',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-instructor.component.html',
  styleUrls: ['./create-instructor.component.css'],
})
export class CreateInstructorComponent implements OnInit {
  createInstructorForm: FormGroup; // Form group for managing the instructor form
  apiUrl = 'http://localhost:3000/instructors'; // JSON server API endpoint

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Initialize the reactive form with validators
    this.createInstructorForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      Area_of_Expertise: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    // Placeholder for additional initialization if needed
  }

  /**
   * Handles form submission for adding instructors
   */
  onSubmit(): void {
    if (this.createInstructorForm.valid) {
      // Fetch the existing instructors to determine the next ID
      this.http.get<any[]>(this.apiUrl).subscribe(
        (existingInstructors) => {
          // Determine the next sequential ID
          const nextId = existingInstructors.length > 0
            ? Math.max(...existingInstructors.map((i) => parseInt(i.id, 10))) + 1
            : 1;

          // Add the generated ID to the form data
          const newInstructor = {
            id: nextId.toString(), // Ensure ID is a string if needed
            ...this.createInstructorForm.value,
          };

          // Save the new instructor to the backend
          this.http.post(this.apiUrl, newInstructor).subscribe(
            () => {
              alert('Instructor added successfully!');
              this.createInstructorForm.reset(); // Reset form after successful submission
            },
            (error) => {
              console.error('Error adding instructor:', error);
              alert('Failed to add instructor.');
            }
          );
        },
        (error) => {
          console.error('Error fetching instructors:', error);
          alert('Failed to fetch existing instructors.');
        }
      );
    } else {
      alert('Form is invalid!');
    }
  }
  }

