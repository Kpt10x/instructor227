import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Instructor {
  id: number;
  name: string;
  email: string;
  phone: string;
  AreaOfExpertise: string;
  experience: number;
  start_date: string;
  end_date: string;
}

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  private apiUrl = 'http://localhost:3000/instructors';

  constructor(private http: HttpClient) {}

  getAllInstructors(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.apiUrl);
  }

  editInstructor(id: number, updatedData: Instructor): Observable<Instructor> {
    return this.http.put<Instructor>(`${this.apiUrl}/${id}`, updatedData);
  }

  deleteInstructor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
