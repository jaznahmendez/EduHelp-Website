import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

import { environment } from 'src/app/environments/environment'
import { LoginService } from 'src/app/shared/services/login.service';
import { ProfessionalService } from 'src/app/shared/services/professional.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  otherUser: boolean = false;
  messages = [ {message: '', otherUser: this.otherUser, name: ''} ]
  socket: any;
  texto: string = ''

  constructor(
    private loginService: LoginService, private professionalService: ProfessionalService
  ) { }

  ngOnInit(): void {
    this.socket = io(environment.apiUrl)
    if(this.messages[0].message == '' && this.messages.length == 1) this.messages.pop();
    
    this.socket.on('newMessage', (data: any) => {
      //console.log('alguien envió un mensaje')
      //console.log(this.otherUser)

      if(this.loginService.getUserType() == 'professional')
      {
        this.professionalService.id = this.loginService.getUserId()
        this.professionalService.getProfessional().subscribe((response: any) => {
          let professional = response
          
          this.messages.push({message: data.message, otherUser: this.otherUser, name: professional.name})
          this.otherUser = false
        });
      }
      else{
        this.messages.push({message: data.message, otherUser: this.otherUser, name: 'Anónimo'})
        this.otherUser = false
      }
    })
  }

  enviarMensaje() {
    //console.log("enviar el mensaje")
    this.otherUser = true
    this.socket.emit('sendMessage', this.texto)
  }
}