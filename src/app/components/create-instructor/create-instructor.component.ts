import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-instructor',
  standalone:true,
  imports: [CommonModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './create-instructor.component.html',
  styleUrls: ['./create-instructor.component.css']
})
export class CreateInstructorComponent implements OnInit {
  createInstructorForm: FormGroup;
  instructorsApiUrl = 'http://localhost:3000/instructors';
  profilesApiUrl = 'http://localhost:3000/profiles';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.createInstructorForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      Area_of_Expertise: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.createInstructorForm.valid) {
      this.http.get<any[]>(this.instructorsApiUrl).subscribe(
        (existingInstructors) => {
          const nextId = existingInstructors.length > 0
            ? Math.max(...existingInstructors.map((i) => parseInt(i.id, 10))) + 1
            : 1;

          const defaultPassword = this.generateRandomPassword();

          const newInstructor = {
            id: nextId.toString(),
            ...this.createInstructorForm.value,
            default_password: defaultPassword
          };

          this.http.post(this.instructorsApiUrl, newInstructor).subscribe(
            () => {
              this.addToProfile(nextId.toString(), newInstructor.email, defaultPassword);
              alert('Instructor added successfully!');
              this.createInstructorForm.reset();
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

  private generateRandomPassword(): string {
    const length = 8;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  }

  private addToProfile(id: string, email: string, password: string): void {
    const profileData = { id, email, default_password: password };
    this.http.get<any[]>(this.profilesApiUrl).subscribe((profiles) => {
      const updatedProfiles = [...profiles, profileData];
      this.http.put(this.profilesApiUrl, updatedProfiles).subscribe(
        () => console.log('Profile updated successfully.'),
        (error) => console.error('Error updating profile:', error)
      );
    });
  }
}
