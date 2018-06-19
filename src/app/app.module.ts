import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { CodelabComponent } from './codelab/codelab.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';

import { MarkdownParserService } from './markdown-parser.service';

const routes: Routes = [
  {
    path: "codelab/:id",
    component: CodelabComponent
  }];

@NgModule({
  declarations: [
    AppComponent,
    CodelabComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
        },
      },
    }),
    HttpClientModule,
    MatSidenavModule,
    MatCardModule,
    MatToolbarModule
  ],
  providers: [MarkdownParserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
