import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }

  getConfig(tutorialId: string) {
    return this.http.get(`/assets/tutorials/${tutorialId}/details.json`);
  }

  getTutorialMd(tutorialId: string) {
    return this.http.get(`/assets/tutorials/${tutorialId}/${tutorialId}.md`, {responseType: 'text'});
  }
}
