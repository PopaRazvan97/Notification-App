import { Component } from '@angular/core';
import { Announcement } from '../announcement';
import { Category } from '../category';
import { AnnouncementService } from '../services/announcement.service';
import { NotificationService } from '../services/notification-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-announcement-form',
  templateUrl: './add-announcement-form.component.html',
  styleUrls: ['./add-announcement-form.component.scss'],
})
export class AddAnnouncementFormComponent {
  announcementForm: FormGroup;
  listOfCategories: Category[] = [
    { id: '1', name: 'Courses' },
    { id: '2', name: 'General' },
    { id: '3', name: 'Labs' },
  ];

  isEditMode: boolean = false;
  announcementId: string;

  constructor(private formBuilder: FormBuilder,
    private announcementService: AnnouncementService, 
    private notificationService: NotificationService, 
    private router: Router,
    private route: ActivatedRoute) {}

    ngOnInit() {
      this.announcementId = this.route.snapshot.paramMap.get('id');
      this.isEditMode = !!this.announcementId;
    
      this.announcementForm = this.formBuilder.group({
        title: ['', [Validators.required, Validators.minLength(1)]],
        author: ['', [Validators.required, Validators.minLength(1)]],
        message: ['', [Validators.required, Validators.minLength(1)]],
        imageUrl: ['', [Validators.required, Validators.pattern('^(http|https)://.*$')]],
        categorySelected: ['', Validators.required],
      });
    
      if (this.isEditMode) {
        this.announcementService.getAnnouncementById(this.announcementId).subscribe((announcement) => {
          this.announcementForm.patchValue({
            title: announcement.title,
            author: announcement.author,
            message: announcement.message,
            imageUrl: announcement.imageUrl,
            categorySelected: announcement.categoryId,
          });
        });
      }
    }

  onSubmit() {
    if (this.announcementForm.invalid) {
      return;
    }
  
    const announcement: Announcement = {
      id: this.isEditMode ? this.announcementId : '00000000-0000-0000-0000-000000000000',
      title: this.announcementForm.value.title,
      author: this.announcementForm.value.author,
      message: this.announcementForm.value.message,
      categoryId: this.announcementForm.value.categorySelected,
      imageUrl: this.announcementForm.value.imageUrl,
    };

    if (this.isEditMode) {
      this.announcementService.updateAnnouncement(announcement).subscribe((updatedAnnouncement) => {
        this.notificationService.sendMessage('BroadcastMessage', [updatedAnnouncement]);
        this.router.navigate(['/']);
      });
    } else {
      this.announcementService.addAnnouncement(announcement).subscribe((createdAnnouncement) => {
        this.notificationService.sendMessage('BroadcastMessage', [createdAnnouncement]);
        this.router.navigate(['/']);
      });
    }
  }
}
