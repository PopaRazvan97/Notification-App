import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Announcement } from '../announcement';
import { AnnouncementService } from '../services/announcement.service';
import { NotificationService } from '../services/notification-service.service';

@Component({
  selector: 'app-announcement', //tag name
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent {
  @Input()
  announcement: Announcement;
  constructor(private announcementService: AnnouncementService, private notificationService: NotificationService) {}
  
  onDelete(id: string) {
    this.announcementService.deleteAnnouncement(id).subscribe(r => {
      this.notificationService.sendMessage("BroadcastMessage", [r]);
      location.reload();
    });
  }
}
