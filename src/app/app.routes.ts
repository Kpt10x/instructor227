import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateInstructorComponent } from './components/create-instructor/create-instructor.component';
import { ViewAssignedCoursesComponent } from './components/view-assigned-courses/view-assigned-courses.component';
import { ViewByCourseComponent } from './components/view-by-course/view-by-course.component';
import { DeleteInstructorComponent } from './components/delete-instructor/delete-instructor.component';
import { ViewAllInstructorsComponent } from './components/view-all-instructors/view-all-instructors.component';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'view-assigned-courses', component: ViewAssignedCoursesComponent },
  { path: 'create-instructor', component: CreateInstructorComponent },
  {path:'view-by-course',component:ViewByCourseComponent},
  { path: 'delete-instructor', component: DeleteInstructorComponent },
  {path:'view-all-instructors',component:ViewAllInstructorsComponent},
  {path:'profile-update',component:ProfileUpdateComponent}


];
