import { Component, OnInit } from '@angular/core';
import { TutorialService } from '../tutorial.service';


export interface CodelabInfos {
  title: string;
  headline: string,
  tagline: string,
  codelabs: Array<any>
}

@Component({
  selector: 'app-codelabs',
  templateUrl: './codelabs.component.html',
  styleUrls: ['./codelabs.component.css']
})
export class CodelabsComponent implements OnInit {
  public searchText: string;
  public infos: CodelabInfos;

  public sortingOptions: Array<any> = [
    { value: 'alphabetical', viewValue: 'Alphabetical' },
    { value: 'duration', viewValue: 'Duration' },
    { value: 'recent', viewValue: 'Recent' }
  ];

  constructor(private ts: TutorialService) {
    this.ts.getCodelabs().subscribe((response: any) => {
      this.infos = response;
    });
  }

  filter(event) {
    console.log(event);
  }

  ngOnInit() {
  }
}
