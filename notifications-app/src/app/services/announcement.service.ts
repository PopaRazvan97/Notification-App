import { Injectable } from '@angular/core';
import { Announcement } from './../announcement';
import { Observable, of } from 'rxjs';
import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  private readonly baseUrl: string =
    'https://localhost:7115/Announcements';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAnnouncements(): Observable<Announcement[]> {
    return this.httpClient.get<Announcement[]>(this.baseUrl, this.httpOptions);
  }

  addAnnouncement(announcement: Announcement): Observable<Announcement> {
    return this.httpClient.post<Announcement>(
      this.baseUrl,
      announcement,
      this.httpOptions
    );
  }

  getAnnouncementById(id: string): Observable<Announcement> {
    return this.httpClient.get<Announcement>(
      `${this.baseUrl}/${id}`,
      this.httpOptions
    );
  }

  deleteAnnouncement(id: string): Observable<Announcement> {
    console.log("deleted " + id);
    return this.httpClient.delete<Announcement>(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  updateAnnouncement(announcement: Announcement): Observable<Announcement> {
    return this.httpClient.put<Announcement>(
      `${this.baseUrl}/${announcement.id}`,
      announcement,
      this.httpOptions
    );
  }
}
