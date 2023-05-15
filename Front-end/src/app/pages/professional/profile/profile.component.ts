import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/shared/interfaces/patient';
import { Professional } from 'src/app/shared/interfaces/professional'
import { PatientService } from 'src/app/shared/services/patient.service';
import { ProfessionalService } from 'src/app/shared/services/professional.service'
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditProfDialogComponent } from './edit-prof-dialog/edit-prof-dialog.component';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { FilesService } from 'src/app/shared/services/files.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  professional: any = {
  }
  idProf: string = ''

  patients: any = []
  pArray: any = []
  patientsProf: any = []
  imageLinkCp : any =  [];

  constructor(private fileService: FilesService, private calendarService: CalendarService, private professionalService: ProfessionalService, private patientService: PatientService,  private route: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idProf = params['id'];
      //console.log(id); // will output "123"
    });
    this.professionalService.setProfessionalProfile(this.idProf)
    this.professionalService.getProfessional().subscribe((response: any) => {
      this.professional = response
    });

    this.patientService.getPatients().subscribe((response: any) => {
      this.patients= response.patient;
      
      for(let i = 0; i < this.patients.length; i++)
      {
        for(let j = 0; j < this.patients[i].currentProffesionals.length; j++)
        {
          if(this.patients[i].currentProffesionals[j] == this.idProf)
          {
            //console.log(this.patients)
            this.patientsProf.push(this.patients[i])
            this.imageLinkCp.push("url('https://randomuser.me/api/portraits/women/" + i + ".jpg')");
          }
        }
      }

      console.log(this.patientsProf)
      this.calendarService.getGoogleCalendarList();
      console.log('pass service')
    });

  }

  updateProfessional(id: string, obj: any) {
    this.professionalService.updateProfessional(obj, id);
  }

  deleteProfessional(id: string) {
    this.professionalService.deleteProfessional(id);
  }

  changeProfessionalPassword(id: string, password: string){
    this.professionalService.id = id;
    this.professionalService.getProfessional().subscribe((response: any) => {
        response.password = password;
        this.professionalService.updateProfessional(response, id);
      
    });
  }
  
  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditProfDialogComponent, {
      data: { ...this.professional }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result){
        console.log('res: ',result);
        console.log('id: ',this.professional._id);
        this.professionalService.updateProfessional(result, this.professional._id);
        this.professional = result;
      }
    });
  }

  attach(input: HTMLInputElement)
  {
    input.click()
  }

  selectFile(e: Event)
  {
    const input = e.target as HTMLInputElement;
    console.log('File: ', input.files![0])
    this.fileService.upload(input).subscribe({
      next: () => {
        //this.photo = this.fileService.getFiles();
        console.log('file uploaded')
      },
      error: () => {
        console.log('file not uploaded')
      }
    }
    );
  }

}
