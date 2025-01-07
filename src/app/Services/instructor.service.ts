import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../Models/course.model';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  editInstructor(instructorId: number, instructorData: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000/instructors';

  constructor(private http: HttpClient) {}

  getAllInstructors() {
    return this.http.get(this.apiUrl);
  }

  getInstructorById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateInstructor(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  deleteInstructor(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('http://localhost:3000/courses');
  }
  
}
