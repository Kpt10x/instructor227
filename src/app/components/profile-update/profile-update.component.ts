import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InstructorService } from '../../Services/instructor.service';

@Component({
  selector: 'app-profile-update',
  standalone: true,
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css'],
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule], // Ensure necessary modules
})
export class ProfileUpdateComponent implements OnInit {
  profileForm: FormGroup; // Reactive form for profile data
  instructorId: string = ''; // ID of the instructor to update
  isLoading = true; // Loading state to handle async operations

  constructor(
    private fb: FormBuilder,
    private instructorService: InstructorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the form
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      areaOfExpertise: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    // Fetch instructor ID from the route
    this.instructorId = this.route.snapshot.paramMap.get('id') || '';
    if (this.instructorId) {
      this.loadInstructorData();
    } else {
      this.isLoading = false; // Stop loading if no ID
    }
  }

  loadInstructorData(): void {
    this.instructorService.getInstructorById(this.instructorId).subscribe({
      next: (data) => {
        this.profileForm.patchValue({
          name: data.name,
          email: data.email,
          phone: data.phone,
          areaOfExpertise: data.areaOfExpertise,
          experience: data.experience,
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading instructor:', err);
        alert('Failed to load instructor data.');
        this.isLoading = false;
      },
    });
  }

  onUpdateProfile(): void {
    if (this.profileForm.valid) {
      const updatedData = { ...this.profileForm.value, id: this.instructorId };
      this.instructorService.updateInstructor(this.instructorId, updatedData).subscribe({
        next: () => {
          alert('Profile updated successfully!');
          this.router.navigate(['/dashboard']); // Redirect after update
        },
        error: (err) => {
          console.error('Error updating profile:', err);
          alert('Failed to update profile.');
        },
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
