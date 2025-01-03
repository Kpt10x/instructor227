import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewByCourseComponent } from './components/view-by-course/view-by-course.component';
import { DeleteInstructorComponent } from './components/delete-instructor/delete-instructor.component';
import { ViewAllInstructorsComponent } from './components/view-all-instructors/view-all-instructors.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () =>
      import('./components/dashboard/dashboard.component').then((m) => m.DashboardComponent) },
  { path: 'view-instructor', loadComponent: () =>
      import('./components/view-assigned-courses/view-assigned-courses.component').then((m) => m.ViewAssignedCoursesComponent) },
  { path: 'create-instructor', loadComponent: () =>
      import('./components/create-instructor/create-instructor.component').then((m) => m.CreateInstructorComponent) },
  { path: 'view-by-course', component: ViewByCourseComponent },
  { path: 'view-all-instructor', component:ViewAllInstructorsComponent  },
  { path: 'delete-instructor/:id', component: DeleteInstructorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
