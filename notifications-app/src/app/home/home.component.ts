import { Component } from '@angular/core';
import { AnnouncementService } from '../services/announcement.service';
import { Announcement } from './../announcement';
import { NotificationService } from '../services/notification-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  title = 'notifications-app';
  filteredAnnouncements: Announcement[] = [];
  notificationMessage: string;
  ngOnInit(): void {
    this.announcementService
      .getAnnouncements()
      .subscribe((announcement) => (this.filteredAnnouncements = announcement));
    this.notificationService.initWebSocket();
    this.notificationService.notificationSubject.subscribe(hasNotifications => this.notificationMessage = hasNotifications ? 'You have new notifications. Please refresh the page!' : '')
  }

  filterAnnouncements(selectedCategory: string) {
    if (!selectedCategory) {
      this.announcementService
        .getAnnouncements()
        .subscribe(
          (announcement) => (this.filteredAnnouncements = announcement)
        );
      return;
    }
    this.announcementService
      .getAnnouncements()
      .subscribe(
        (announcement) =>
          (this.filteredAnnouncements = announcement.filter(
            (ann) => ann.categoryId === selectedCategory
          ))
      );
  }

  constructor(private announcementService: AnnouncementService, private notificationService: NotificationService) {}
}
