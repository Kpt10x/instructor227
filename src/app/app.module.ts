import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { AppRoutingModule } from './app-routing.module'; // Import AppRoutingModule
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component'; // Import AppComponent

@NgModule({
  declarations: [
    // Ensure AppComponent is declared
    DashboardComponent, // Declare DashboardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    RouterModule,
    HttpClientModule,
    SidebarComponent, // Add SidebarComponent to imports if it's standalone
  ],
  providers: [], // HttpClientModule auto-provides HttpClient; no need for extra providers
  bootstrap: [], // Bootstrap the AppComponent
})
export class AppModule {}
