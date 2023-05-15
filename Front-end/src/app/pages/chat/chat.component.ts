import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

import { environment } from 'src/app/environments/environment'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  owned: boolean = false;
  messages = [ {message: '', owned: this.owned} ]
  socket: any;
  texto: string = ''

  ngOnInit(): void {
    this.socket = io(environment.apiUrl)

    this.socket.on('newMessage', (data: any) => {
      console.log('alguien envió un mensaje')
      //this.owned = true
      this.messages.push({message: data.message, owned: this.owned})
      this.owned = false
    })
  }

  enviarMensaje() {
    console.log("enviar el mensaje")
    this.owned = true
    this.socket.emit('sendMessage', this.texto)
  }
}