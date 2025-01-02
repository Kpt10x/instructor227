import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-view-by-availability',
  standalone:true,
  templateUrl: './view-by-availability.component.html',
  styleUrls: ['./view-by-availability.component.css'],
  imports:[FormsModule,CommonModule,HttpClientModule]
})
export class ViewByAvailabilityComponent implements OnInit {
  instructors: any[] = [];
  filteredInstructors: any[] = [];
  availabilityFilter = { startDate: '', endDate: '' };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('assets/data/instructors.json').subscribe((data) => {
      this.instructors = data;
      this.filteredInstructors = data;
    });
  }

  filterByAvailability(): void {
    const { startDate, endDate } = this.availabilityFilter;
    this.filteredInstructors = this.instructors.filter((instructor) => {
      return (
        (!startDate || new Date(instructor.start_date) >= new Date(startDate)) &&
        (!endDate || new Date(instructor.end_date) <= new Date(endDate))
      );
    });
  }
}
