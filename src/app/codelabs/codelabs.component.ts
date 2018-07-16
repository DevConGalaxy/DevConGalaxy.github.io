import { Component, OnInit } from '@angular/core';
import { TutorialService } from '../tutorial.service';
import { languages } from 'prismjs';
import { ApplicationService } from '../services/application.service';

export interface Tutorial {
  id: string,
  title: string,
  duration: number,
  language: string,
  date: string
};

export interface CodelabInfos {
  title: string;
  headline: string,
  tagline: string,
  tutorials: Array<Tutorial>
};

@Component({
  selector: 'app-codelabs',
  templateUrl: './codelabs.component.html',
  styleUrls: ['./codelabs.component.css']
})
export class CodelabsComponent implements OnInit {
  public searchText: string;
  // public infos: CodelabInfos;
  public tutorials: Array<Tutorial>

  public sortingOptions: Array<any> = [
    { value: 'title', viewValue: 'Alphabetical' },
    { value: 'duration', viewValue: 'Duration' },
    { value: 'date', viewValue: 'Recent' }
  ];

  constructor(private ts: TutorialService,
    public application: ApplicationService) {
    this.tutorials = application.applicationInfos.tutorials;
    this.sortTutorialsBy({ value: 'title' });
    // this.ts.getCodelabs().subscribe((response: any) => {
    // this.infos = response;
    // this.sortTutorialsBy({value:'title'});
    // });
  }

  sortByDate(tutorial1, tutorial2) {
    const date1 = new Date(tutorial1.date);
    const date2 = new Date(tutorial2.date);
    if (date1 < date2) {
      return 1;
    }
    if (date1 > date2) {
      return -1;
    }
    return 0;
  }

  sortTutorialsBy(event) {
    this.tutorials = this.application.applicationInfos.tutorials.sort((tutorial1, tutorial2) => {
      console.log(event);
      if (event.value === "date") {
        return this.sortByDate(tutorial1, tutorial2);
      } else {
        if (tutorial1[event.value] > tutorial2[event.value]) {
          return 1;
        }
        if (tutorial1[event.value] < tutorial2[event.value]) {
          return -1;
        }
        return 0;
      }
    });
  }

  filterByLanguage(event) {
    if (event.value === "all") {
      this.tutorials = this.application.applicationInfos.tutorials;
    } else {
      this.tutorials = this.application.applicationInfos.tutorials.filter(tutorial => tutorial.language === event.value);
    }
  }

  ngOnInit() {
  }
}
