import { BrowserModule } from '@angular/platform-browser';
import { NgModule, SecurityContext, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodelabsComponent } from './codelabs/codelabs.component';
import { CodelabComponent } from './codelab/codelab.component';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { ApplicationService } from './services/application.service';
import { FilterPipe } from './filter.pipe';
import { StatusPipe } from './status.pipe';

// export function appInitialiser(appService: ApplicationService) {
//   return () => appService.initializeApp();
// }

@NgModule({
  declarations: [
    AppComponent,
    CodelabsComponent,
    CodelabComponent,
    FilterPipe,
    StatusPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
