import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  infos: any;

  constructor(private http: HttpClient) { }

  getAllTutorials() {
    return this.http.get(`${environment.baseURL}/assets/codelabs/tutorials.json`);
  }

  getTutorialMd(tutorialId: string) {
    return this.http.get(`${environment.baseURL}/assets/codelabs/${tutorialId}/tutorial.md`, {responseType: 'text'});
  }

  getTutorialData(tutorialId: string) {
    return this.http.get(`${environment.baseURL}/assets/codelabs/${tutorialId}/data.json`);
  }
}
