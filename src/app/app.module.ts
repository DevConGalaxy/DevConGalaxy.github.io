import { BrowserModule } from '@angular/platform-browser';
import { NgModule, SecurityContext, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodelabsComponent } from './codelabs/codelabs.component';
import { CodelabComponent } from './codelab/codelab.component';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { ApplicationService } from './services/application.service';
import { ResumeDialogComponent } from './codelab/resume-dialog.component';

import { FilterPipe } from './filter.pipe';
import { StatusPipe } from './status.pipe';
import { MeetupsComponent } from './meetups/meetups.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';


// export function appInitialiser(appService: ApplicationService) {
//   return () => appService.initializeApp();
// }

@NgModule({
  declarations: [
    AppComponent,
    CodelabsComponent,
    CodelabComponent,
    ResumeDialogComponent,
    FilterPipe,
    StatusPipe,
    MeetupsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatSidenavModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: SecurityContext.NONE,
          smartLists: true,
          smartypants: false
        }
      }
    }),
    BrowserAnimationsModule,
    LeafletModule
  ],
  providers: [
    // ApplicationService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: appInitialiser,
    //   deps: [ApplicationService],
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
