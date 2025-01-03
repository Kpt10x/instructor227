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
      subject: ['', Validators.required],
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
      const formData = this.createInstructorForm.value;

      // Save the instructor to the backend
      this.http.post(this.apiUrl, formData).subscribe(
        (response) => {
          alert('Instructor added successfully!');
          this.createInstructorForm.reset(); // Reset form after successful submission
        },
        (error) => {
          console.error('Error adding instructor:', error);
          alert('Failed to add instructor.');
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
