import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MarkdownParserService } from '../markdown-parser.service';
import { TutorialService } from '../tutorial.service';

import { MarkdownService } from 'ngx-markdown';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-codelab',
  templateUrl: './codelab.component.html',
  styleUrls: ['./codelab.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CodelabComponent implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  private currentStep: number = 0;
  private tutorialId: string;
  private tutorialDetails: any;
  private tutorialMd: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private ts: TutorialService,
              private md: MarkdownParserService,
              private markdownService: MarkdownService) {
     }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      if (!params.has("step")) {
        this.currentStep = 1;
      } else {
        this.currentStep = Number(params.get("step"));
      }
      this.updateStepUrl();
    });
    this.route.paramMap.subscribe(params => {
      this.tutorialId = params.get("id");
      this.getTutorial();
    });
  }

  getTutorialMdUrl() {
    return `/assets/tutorials/${this.tutorialId}/${this.tutorialId}.md`;
  }

  getTutorial() {
    console.log(`tutorial : ${this.tutorialId}`);
    this.ts.getConfig(this.tutorialId).subscribe(response => {
      this.tutorialDetails = response;
    });
    this.ts.getTutorialMd(this.tutorialId).subscribe(response => {
      // this.tutorialMd = this.md.convert(response.toString());
      // this.tutorialMd = this.markdownService.compile(response.toString());
    });
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

  goToStep(step: number) {
    this.currentStep = step;
    this.updateStepUrl();
  }

  next() {
    this.currentStep++;
    this.updateStepUrl();
    // const convertedText = this.md.convert("## This is a super text");
    // console.log(convertedText);
    // debugger;
  }

  prev() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateStepUrl();
    }
  }

  updateStepUrl() {
    this.router.navigate([], { queryParams: { step: this.currentStep }});
  }

}
