import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private connection: signalR.HubConnection;
  public notificationSubject: BehaviorSubject<boolean>;

  constructor() {
    this.notificationSubject = new BehaviorSubject(false);
  }

  public initWebSocket() {
    this.connection = new HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)
    .withUrl('https://localhost:7115/hub/notifications')
    .build();

    this.connection.on('message_received', (body: any) => {
      console.log(body);
      this.notificationSubject.next(true);
    })

    this.connection.start().then( ()=>{
      console.log('Connection started');
    })
  }

  public sendMessage(methodName: string, parameters?: any) {
    this.connection.send(methodName, parameters);
  }

}
