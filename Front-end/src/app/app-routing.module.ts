import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfessionalComponent } from './pages/professional/professional.component';
import { ProfileComponent } from './pages/professional//profile/profile.component';
import { DetalleProfessionalComponent } from './pages/detalle-professional/detalle-professional.component';

import { PatientComponent } from './pages/patient/patient.component';

const routes: Routes = [
  {path: 'professional', component: ProfessionalComponent},
  {path: 'professional/:id', component: DetalleProfessionalComponent},
  {path: 'professional/profile/:id', component: ProfileComponent},
  {path: 'patient', component: PatientComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }