import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, marker, polygon, icon } from 'leaflet';
import { MeetupService } from '../meetup.service';

export interface Coordinates {
  lat: number;
  long: number
};

export interface Meetup {
  id: string;
  label: string;
  url: string;
  location: string;
  events: Array<any>;
  coordinates: Coordinates;
};

@Component({
  selector: 'app-meetups',
  templateUrl: './meetups.component.html',
  styleUrls: ['./meetups.component.scss']
})
export class MeetupsComponent implements OnInit {
  public meetups: Array<Meetup> = new Array<Meetup>();
  public conferences: Array<Meetup> = new Array<Meetup>();

  public mapOptions = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' })
    ],
    zoom: 5,
    center: latLng(47.2840472,3.0796167)
  };

  public mapLayers = [];
  
  constructor(public meetupService: MeetupService) { }

  ngOnInit(): void {
    this.meetupService.getAllMeetups().subscribe((response: any) => {
      console.log(response);
      this.meetups = response.meetups;
      this.conferences = response.conferences;
      this.buildCitiesMap();
      for (const meetup of this.meetups) {
        this.getMeetupEvents(meetup);
      }
    });
  }

  buildCitiesMap() {
    const cities = {};
    for (const meetup of this.meetups) {
      if (!cities[meetup.location]) {
        cities[meetup.location] = [];
      }
      cities[meetup.location].push(meetup);
    }

    for (const city in cities) {
      this.addLayerToMap(cities[city]);
    }
  }

  addLayerToMap(city: Array<Meetup>) {
    // this.mapLayers.push(marker(
    //   [ meetup.coordinates.lat, meetup.coordinates.long ], {
    //   icon: icon({
    //     iconSize: [ 25, 41 ],
    //     iconAnchor: [ 13, 41 ],
    //     iconUrl: 'assets/marker-icon.png',
    //     shadowUrl: 'assets/marker-shadow.png'
    //   })
    // });
    // this.mapLayers.push(
    //   circle(
    //     [ meetup.coordinates.lat, meetup.coordinates.long ], 
    //     { radius: 17000, fillColor : '#3388ff', fillOpacity : 1}
    //   ).bindPopup(`<a href="${meetup.url}" target="_blank">${meetup.label}</a>`)
    // );
    const meetupUrls = [];
    for (const meetup of city) {
      meetupUrls.push(
        `<a href="${meetup.url}" target="_blank">
          <div><b>${meetup.label}</b></div> 
          <div>${meetup.location}</div>
        </a>`
        );
    }
    this.mapLayers.push(
      circle(
        [ city[0].coordinates.lat, city[0].coordinates.long ], 
        { radius: 17000, fillColor : '#3388ff', fillOpacity : 1}
      ).bindPopup(meetupUrls.join('<br />'))
    )
  }

  getMeetupEvents(meetup: Meetup) {
    this.meetupService.getMeetupEvents(meetup.url).subscribe((response: any) => {
      meetup.events = response;
    });
  } 
}
