import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import {MatCommonModule} from '@angular/material/core';
import { AdminComponent } from './pages/admin/admin.component';
import { PatientComponent } from './pages/patient/patient.component';
import { ProfessionalComponent } from './pages/professional/professional.component';
import { TutorComponent } from './pages/tutor/tutor.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NavComponent } from './layouts/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';

import { DetalleProfessionalComponent } from './pages/detalle-professional/detalle-professional.component';
import { ProfileComponent } from './pages/professional/profile/profile.component';
import { PprofileComponent } from './pages/patient/pprofile/pprofile.component';
import { DetallesPatientComponent } from './pages/detalles-patient/detalles-patient.component';
import { DetalleTutorComponent } from './pages/detalle-tutor/detalle-tutor.component';
import { TProfileComponent } from './pages/tutor/tprofile/tprofile.component';
import { DetalleAdminComponent } from './pages/detalle-admin/detalle-admin.component';
import { AProfileComponent } from './pages/admin/aprofile/aprofile.component';


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
    DetallesPatientComponent,
    DetalleTutorComponent,
    TProfileComponent,
    DetalleAdminComponent,
    AProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatExpansionModule,
    MatMenuModule,
    MatCardModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    MatButtonToggleModule,
    MatTooltipModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
