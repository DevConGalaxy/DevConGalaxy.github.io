import { Component } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { TutorialService } from './tutorial.service';

export interface Tutorial {
  id: string;
  title: string;
  duration: number;
  language: string;
  date: string;
}

export interface CodelabInfos {
  title: string;
  headline: string;
  tagline: string;
  tutorials: Array<Tutorial>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(
    angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    private ts: TutorialService
  ) {
    // this.ts.getCodelabs().subscribe((response: any) => {
    //   // this.infos = response;
    //   this.ts.infos = response;
    // });
  }
}
