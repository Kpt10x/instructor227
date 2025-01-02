import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateInstructorComponent } from './components/create-instructor/create-instructor.component';
import { ViewAssignedCoursesComponent } from './components/view-assigned-courses/view-assigned-courses.component';
import { ViewByAvailabilityComponent } from './components/view-by-availability/view-by-availability.component';
import { ViewByCourseComponent } from './components/view-by-course/view-by-course.component';
import { ViewByDetailsComponent } from './components/view-by-details/view-by-details.component';
import { DeleteInstructorComponent } from './components/delete-instructor/delete-instructor.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'view-assigned-courses', component: ViewAssignedCoursesComponent },
  { path: 'create-instructor', component: CreateInstructorComponent },
  {path:'view-by-availability',component:ViewByAvailabilityComponent},
  {path:'view-by-course',component:ViewByCourseComponent},
  {path:'view-by-details', component:ViewByDetailsComponent},
  { path: 'delete-instructor', component: DeleteInstructorComponent },


];
