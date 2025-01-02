import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-view-by-details',
  standalone:true,
  templateUrl: './view-by-details.component.html',
  styleUrls: ['./view-by-details.component.css'],
  imports:[FormsModule,CommonModule, HttpClientModule]
})
export class ViewByDetailsComponent implements OnInit {
  instructors: any[] = [];
  filteredInstructors: any[] = [];
  searchQuery: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('assets/data/instructors.json').subscribe((data) => {
      this.instructors = data;
      this.filteredInstructors = data;
    });
  }

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
}
