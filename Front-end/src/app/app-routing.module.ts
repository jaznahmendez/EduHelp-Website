import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfessionalComponent } from './pages/professional/professional.component';
import { ProfileComponent } from './pages/professional//profile/profile.component';
import { DetalleProfessionalComponent } from './pages/detalle-professional/detalle-professional.component';

import { PatientComponent } from './pages/patient/patient.component';
import { DetallesPatientComponent } from './pages/detalles-patient/detalles-patient.component';
import { PprofileComponent } from './pages/patient/pprofile/pprofile.component';

import { TutorComponent } from './pages/tutor/tutor.component';
import { DetalleTutorComponent } from './pages/detalle-tutor/detalle-tutor.component';

const routes: Routes = [
  {path: 'professional', component: ProfessionalComponent},
  {path: 'professional/:id', component: DetalleProfessionalComponent},
  {path: 'professional/profile/:id', component: ProfileComponent},

  {path: 'patient', component: PatientComponent},
  {path: 'patient/:id', component: DetallesPatientComponent},
  {path: 'patient/profile/:id', component: PprofileComponent},

  {path: 'tutor', component: TutorComponent},
  {path: 'tutor/:id', component: DetalleTutorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }