import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TutorialService } from '../tutorial.service';

import { MatDialog } from '@angular/material/dialog';

import { ResumeDialogComponent } from './resume-dialog.component';

declare var Konami: any;

@Component({
  selector: 'app-codelab',
  templateUrl: './codelab.component.html',
  styleUrls: ['./codelab.component.scss']
})
export class CodelabComponent implements OnInit {

  public currentStep = 0;
  private tutorialId: string;
  public tutorialDetails: any;
  public steps: Array<any> = new Array<any>();
  private tutorialMd: any;
  public tutorialResources: Array<any> = new Array<any>();
  public tutorialSteps: Array<string> = new Array<string>();
  public mcid = '';
  public konamicode: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ts: TutorialService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      this.tutorialId = params.get('id');
      this.mcid = this.route.snapshot.queryParamMap.get('wtmcid')  || '3022639';
      
      this.konamicode = new Konami(`./assets/codelabs/${this.tutorialId}/solution.html`);

      this.getTutorial();
      this.getData();
      this.route.queryParamMap.subscribe((innerParams: any) => {
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
        }
        this.updateStepUrl(true);
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

  getData() {
    this.ts.getTutorialData(this.tutorialId).subscribe((response: any) => {
      console.log(response);

      this.tutorialResources = response.resources || [];
    });
  }
  goToStep(step: number) {
    this.currentStep = step;
    this.updateStepUrl();
    this.scrollToTop();
  }

  next() {
    this.currentStep++;
    this.updateStepUrl();
    this.scrollToTop();
  }

  prev() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateStepUrl();
      this.scrollToTop();
    }
  }

  scrollToTop() {
    document.querySelector('.codelab-steps').scrollTo(0, 0);
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
