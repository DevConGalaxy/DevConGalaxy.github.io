import { Component, OnInit } from '@angular/core';
import { MeetupService } from '../meetup.service';

export interface Meetup {
  id: string;
  label: string;
  url: string;
  location: string;
  events: Array<any>;
}

@Component({
  selector: 'app-meetups',
  templateUrl: './meetups.component.html',
  styleUrls: ['./meetups.component.scss']
})
export class MeetupsComponent implements OnInit {
  public meetups: Array<Meetup> = new Array<Meetup>();

  constructor(public meetupService: MeetupService) { }

  ngOnInit(): void {
    this.meetupService.getAllMeetups().subscribe((response: any) => {
      console.log(response);
      this.meetups = response.meetups;
      for (const meetup of this.meetups) {
        this.getMeetupEvents(meetup);
      }
    });
  }

  getMeetupEvents(meetup: Meetup) {
    this.meetupService.getMeetupEvents(meetup.url).subscribe((response: any) => {
      meetup.events = response;
    });
  } 
}
