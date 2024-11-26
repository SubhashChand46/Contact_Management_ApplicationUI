import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AddUpdateContactComponent } from './dashboard/add-update-contact/add-update-contact.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddUpdateContactComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModalModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
