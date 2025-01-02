import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule here
import { AppRoutingModule } from './app-routing.module'; // Make sure to import AppRoutingModule
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    
    DashboardComponent, 
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule ,
    SidebarComponent,
    FontAwesomeModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [ provideHttpClient(withFetch())],
  bootstrap: []  
})
export class AppModule { }
