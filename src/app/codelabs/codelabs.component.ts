import { Component, OnInit } from '@angular/core';
import { TutorialService } from '../tutorial.service';

@Component({
  selector: 'app-codelabs',
  templateUrl: './codelabs.component.html',
  styleUrls: ['./codelabs.component.css']
})
export class CodelabsComponent implements OnInit {
  public searchText: string;
  public codelabs: Array<any> = [];

  public sortingOptions: Array<any> = [
    { value: 'alphabetical', viewValue: 'Alphabetical' },
    { value: 'duration', viewValue: 'Duration' },
    { value: 'recent', viewValue: 'Recent' }
  ];

  constructor(private ts: TutorialService) {
    this.ts.getCodelabs().subscribe((response: any) => {
      this.codelabs = response.codelabs;
    });
  }

  filter(event) {
    console.log(event);
  }

  ngOnInit() {
  }
}
