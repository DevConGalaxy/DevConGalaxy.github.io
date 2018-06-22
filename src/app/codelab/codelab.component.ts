import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MarkdownParserService } from '../markdown-parser.service';
import { TutorialService } from '../tutorial.service';

import { MarkdownService } from 'ngx-markdown';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

const SMALL_WIDTH_BREAKPOINT = 720;
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'app-codelab',
  templateUrl: './codelab.component.html',
  styleUrls: ['./codelab.component.css'],
  encapsulation: ViewEncapsulation.None,
  // animations: [
  //   trigger('toggleState', [
  //     state('true' , style({ transform: 'translateX(0)' })),
  //     state('false', style({ maxHeight: 0, padding: 0, transform: 'translateX(-100%)' })),
  //     // transition
  //     transition('* => *', animate(3000)),
  //   ])
  // ]
})
export class CodelabComponent implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  private currentStep: number = 0;
  private tutorialId: string;
  private tutorialDetails: any;
  private steps: Array<any> = new Array<any>();
  private tutorialMd: any;
  private tutorialSteps: Array<string> = new Array<string>();
  private totalDuration: number = 0;
  private remainDuration: number = 0;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private ts: TutorialService,
    private md: MarkdownParserService,
    private markdownService: MarkdownService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.tutorialId = params.get("id");
      this.getTutorial();
      this.route.queryParamMap.subscribe(params => {
        if (!params.has("step")) {
          const lsStep = JSON.parse(localStorage.getItem(this.tutorialId));
          if (lsStep) {
            this.currentStep = lsStep.step;
          } else {
            this.currentStep = 1;
          }
          this.updateStepUrl(true);

          if (this.currentStep > 1) {
            this.openResumeDialog();
          }
        } else {
          this.currentStep = Number(params.get("step"));
        }
      });
    });
  }

  openResumeDialog(): void {
    let dialogRef = this.dialog.open(ResumeDialog, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'restart') {
        this.currentStep = 1;
        this.updateStepUrl();
      }
      console.log('The dialog was closed');
      console.log(`result ": ${result}`);
    });
  }

  getTutorialMdUrl() {
    return `/assets/tutorials/${this.tutorialId}/${this.tutorialId}.md`;
  }

  getTutorial() {
    console.log(`tutorial : ${this.tutorialId}`);
    // this.ts.getConfig(this.tutorialId).subscribe(response => {
    //   this.tutorialDetails = response;
    // });
    let i = 0;
    this.ts.getTutorialMd(this.tutorialId).subscribe(response => {

      this.tutorialMd = response;

      response.split('--sep--').map(str => {

        let [, title, duration, , ...txt] = str.trim().split('\n');
        title = title.split(':').pop();
        duration = duration.split(':').pop();
        console.log(`title : ${title} duration: ${duration}`);
        if (i === 0) {
          this.tutorialDetails = {
            title: title.trim()
          };
        } else {
          this.steps.push({
            title: title.trim(),
            duration: Number(duration.trim())
          });
          this.totalDuration += Number(duration);
          this.tutorialSteps.push(txt.join("\n"));
        }
        i++;
      });

      this.calculateRemainingDuration();
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
  }

  prev() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateStepUrl();
    }
  }

  calculateRemainingDuration() {
    this.remainDuration = this.totalDuration;
    for (let i = 0; i < this.steps.length; i++) {
      if (i < this.currentStep) {
        this.remainDuration -= this.steps[i].duration;
      }
    }
  }

  updateStepUrl(replaceUrl = false) {
    this.calculateRemainingDuration();
    if (this.tutorialId) {
      localStorage.setItem(this.tutorialId, `{"step":${this.currentStep}}`);;
    }
    this.router.navigate([], { queryParams: { step: this.currentStep }, replaceUrl: replaceUrl });
  }
}


@Component({
  selector: 'resume-dialog',
  template: `
    <h2 mat-dialog-title>Resume Tutorial</h2>
    <mat-dialog-content>We noticed you have already started this tutorial. Do you want to continue it?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button (click)="close('restart')">Restart</button>
      <button mat-raised-button color="primary" (click)="close('resume')">Continue</button>
    </mat-dialog-actions>
  `,
})
export class ResumeDialog {

  constructor(
    public dialogRef: MatDialogRef<ResumeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  close(val: string) {
    this.dialogRef.close(val);
  }
}