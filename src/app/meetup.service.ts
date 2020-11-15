import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetupService {

  infos: any;

  constructor(private http: HttpClient) { }

  getAllMeetups() {
    return this.http.get(`${environment.baseURL}/assets/meetups.json`);
  }

  getMeetupEvents(meetupUrl: string) {
    return this.http.get(`https://cors-anywhere.herokuapp.com/${meetupUrl}/events/json/`);
  }
}
