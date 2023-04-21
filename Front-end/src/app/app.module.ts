import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http'

import {MatCommonModule} from '@angular/material/core';
import { AdminComponent } from './pages/admin/admin.component';
import { PatientComponent } from './pages/patient/patient.component';
import { ProfessionalComponent } from './pages/professional/professional.component';
import { TutorComponent } from './pages/tutor/tutor.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NavComponent } from './layouts/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';


import {MatButtonModule} from '@angular/material/button';
import { DetalleProfessionalComponent } from './pages/detalle-professional/detalle-professional.component';
import { ProfileComponent } from './pages/professional/profile/profile.component';
import { PprofileComponent } from './pages/patient/pprofile/pprofile.component';
import { DetallesPatientComponent } from './pages/detalles-patient/detalles-patient.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    PatientComponent,
    ProfessionalComponent,
    TutorComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    DetalleProfessionalComponent,
    ProfileComponent,
    PprofileComponent,
    DetallesPatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCommonModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
