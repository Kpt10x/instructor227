import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Course {
  courseId: string;
  courseName: string;
  duration: string;
  enrolledCandidates: number;
  status: string;
  description: string;
  startDate?: string; // Optional property for start date
  endDate?: string;   // Optional property for end date
}

interface AssignedCourse {
  courseId: string;
  startDate: string;
  endDate: string;
}

interface InstructorProfile {
  id: string;
  assignedCourses: AssignedCourse[];
}

@Component({
  selector: 'app-view-assigned-courses',
  standalone:true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './view-assigned-courses.component.html',
  styleUrls: ['./view-assigned-courses.component.css'],
})
export class ViewAssignedCoursesComponent implements OnInit {
  instructorId = '1'; // Dynamic value depending on context
  assignedCourses: Course[] = []; // Store courses with start and end dates
  apiUrlProfiles = 'http://localhost:3000/profiles'; // API endpoint for profiles
  apiUrlCourses = 'http://localhost:3000/courses'; // API endpoint for courses

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAssignedCoursesForInstructor();
  }

  fetchAssignedCoursesForInstructor(): void {
    this.http.get<InstructorProfile[]>(this.apiUrlProfiles).subscribe(
      (profiles) => {
        const profile = profiles.find((p) => p.id === this.instructorId);
        if (profile && profile.assignedCourses) {
          const courseIds = profile.assignedCourses.map((course) => course.courseId);
          const dateMap = new Map<string, { startDate: string; endDate: string }>(
            profile.assignedCourses.map((course) => [course.courseId, { startDate: course.startDate, endDate: course.endDate }])
          );

          this.http.get<Course[]>(this.apiUrlCourses).subscribe(
            (allCourses) => {
              this.assignedCourses = allCourses
                .filter((course) => courseIds.includes(course.courseId))
                .map((course) => ({
                  ...course,
                  startDate: dateMap.get(course.courseId)?.startDate || 'N/A',
                  endDate: dateMap.get(course.courseId)?.endDate || 'N/A',
                }));
            },
            (error) => {
              console.error('Error fetching courses:', error);
            }
          );
        } else {
          console.error('Instructor profile not found or no assigned courses.');
        }
      },
      (error) => {
        console.error('Error fetching profiles:', error);
      }
    );
  }
}
