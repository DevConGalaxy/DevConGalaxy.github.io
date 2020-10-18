import { Component, OnInit } from '@angular/core';
import { TutorialService } from '../tutorial.service';
// import { ApplicationService } from '../services/application.service';

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
  selector: 'app-codelabs',
  templateUrl: './codelabs.component.html',
  styleUrls: ['./codelabs.component.scss']
})
export class CodelabsComponent implements OnInit {
  public tutorials: Array<Tutorial> = new Array<Tutorial>();
  public applicationInfos: any = {};
  constructor(
    private ts: TutorialService
  ) { 
  }

  ngOnInit(): void {
    this.ts.getAllTutorials().subscribe((response: any) => {
      console.log(response);
      this.tutorials = response.tutorials;
      this.applicationInfos = response;
    });
  }

}
