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
import { TProfileComponent } from './pages/tutor/tprofile/tprofile.component';

import { AdminComponent } from './pages/admin/admin.component';
import { DetalleAdminComponent } from './pages/detalle-admin/detalle-admin.component';
import { AProfileComponent } from './pages/admin/aprofile/aprofile.component';

import { HomeComponent } from './pages/home/home.component';
import { CalendarComponent } from './pages/calendar/calendar.component';

import { ChatComponent } from './pages/chat/chat.component';
import { MyCalendarComponent } from './pages/calendar/my-calendar/my-calendar.component';
import { AuthGuard } from './shared/guards/auth.guard'


const routes: Routes = [
  {path: '', component: HomeComponent},

  {path: 'professional', component: ProfessionalComponent, canActivate: [AuthGuard] },
  {path: 'professional/:id', component: DetalleProfessionalComponent, canActivate: [AuthGuard] },
  {path: 'professional/profile/:id', component: ProfileComponent},

  {path: 'patient', component: PatientComponent, canActivate: [AuthGuard] },
  {path: 'patient/:id', component: DetallesPatientComponent, canActivate: [AuthGuard] },
  {path: 'patient/profile/:id', component: PprofileComponent},

  {path: 'tutor', component: TutorComponent, canActivate: [AuthGuard] },
  {path: 'tutor/:id', component: DetalleTutorComponent, canActivate: [AuthGuard] },
  {path: 'tutor/profile/:id', component: TProfileComponent},

  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  {path: 'admin/:id', component: DetalleAdminComponent, canActivate: [AuthGuard] },
  {path: 'admin/profile/:id', component: AProfileComponent},

  {path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
  {path: 'mycalendar', component: MyCalendarComponent, canActivate: [AuthGuard] },
  {path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },

  {path: 'chat', component: ChatComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}

