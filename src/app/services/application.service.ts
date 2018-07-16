import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resolve } from '../../../node_modules/@types/q';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  applicationInfos: any;

  constructor(private http: HttpClient) { }

  initializeApp(): Promise<any> {
    
    return new Promise((resolve, reject) => {
      this.http.get(environment.application)
      .toPromise()
      .then(
        res => {
          this.applicationInfos = res;
          resolve();
        }
      ).catch(this.handleError());
    });
  }

  handleError() {
    return (error: any) => {
      console.log(error);
    }
  }
}
