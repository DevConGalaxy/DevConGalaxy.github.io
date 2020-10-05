import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MarkdownParserService } from '../markdown-parser.service';
import { TutorialService } from '../tutorial.service';

import { MarkdownService } from 'ngx-markdown';
import { MatDialog } from '@angular/material';

declare var Konami: any;

const SMALL_WIDTH_BREAKPOINT = 720;
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { ApplicationService } from '../services/application.service';
import { ResumeDialogComponent } from './resume-dialog.component';

@Component({
  selector: 'app-codelab',
  templateUrl: './codelab.component.html',
  styleUrls: ['./codelab.component.css'],
  encapsulation: ViewEncapsulation.None
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
  private mediaMatcher: MediaQueryList = matchMedia(
    `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
  );
  public currentStep = 0;
  private tutorialId: string;
  public tutorialDetails: any;
  public steps: Array<any> = new Array<any>();
  private tutorialMd: any;
  public tutorialSteps: Array<string> = new Array<string>();
  public mcid = '';

  konamicode: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ts: TutorialService,
    public application: ApplicationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.tutorialId = params.get('id');

    this.konamicode = new Konami(`assets/codelabs/${this.tutorialId}/solution.html`);

      this.mcid = this.route.snapshot.queryParamMap.get('wtmcid');

      this.getTutorial();
      this.route.queryParamMap.subscribe(innerParams => {
        if (!innerParams.has('step')) {
          const localStorageStep = JSON.parse(
            localStorage.getItem(this.tutorialId)
          );
          if (localStorageStep) {
            this.currentStep = localStorageStep.step;
          } else {
            this.currentStep = 1;
          }

          if (this.currentStep > 1) {
            this.openResumeDialog();
          } else {
            this.updateStepUrl(true);
          }
        } else {
          this.currentStep = Number(innerParams.get('step'));
          if (this.currentStep < 1) {
            this.currentStep = 1;
            this.updateStepUrl(true);
          }
        }
        if (
          this.tutorialSteps.length > 0 &&
          this.currentStep > this.tutorialSteps.length
        ) {
          this.currentStep = this.tutorialSteps.length;
          this.updateStepUrl(true);
        }
      });
    });
  }

  openResumeDialog(): void {
    setTimeout(() => {
      const dialogRef = this.dialog.open(ResumeDialogComponent, {
        width: '350px'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'restart') {
          this.currentStep = 1;
          this.updateStepUrl();
        }
      });
    }, 0);
  }

  getTutorial() {
    let i = 0;
    this.ts.getTutorialMd(this.tutorialId).subscribe(response => {
      const path = `assets/codelabs/${this.tutorialId}`;
      this.tutorialMd = response.replace(/media/g, `${path}/images`);
      this.tutorialMd = this.tutorialMd.replace(/WTMCID/g, this.mcid);

      this.tutorialMd.split('--sep--').map(str => {
        // tslint:disable-next-line:prefer-const
        let [, title, duration, , ...txt] = str.trim().split('\n');
        title = title.split(':').pop();
        if (i === 0) {
          this.tutorialDetails = {
            title: title.trim()
          };
        } else {
          this.steps.push({
            title: title.trim(),
          });
          this.tutorialSteps.push(txt.join('\n'));
        }
        i++;
      });

      if (this.currentStep > this.tutorialSteps.length) {
        this.currentStep = this.tutorialSteps.length;
        this.updateStepUrl(true);
      }
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

  updateStepUrl(replaceUrl = false) {
    if (this.tutorialId) {
      localStorage.setItem(this.tutorialId, `{"step":${this.currentStep}}`);
    }
    this.router.navigate([], {
      queryParams: { step: this.currentStep, wtmcid: this.mcid },
      replaceUrl: replaceUrl
    });
  }
}


