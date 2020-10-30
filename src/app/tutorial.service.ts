import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  infos: any;

  constructor(private http: HttpClient) { }

  getAllTutorials() {
    return this.http.get(`assets/codelabs/tutorials.json`);
  }

  getTutorialMd(tutorialId: string) {
    // return this.http.get(`https://raw.githubusercontent.com/tagazok/workshops/gh-pages/assets/codelabs/${tutorialId}/${tutorialId}.md`, {responseType: 'text'});
    return this.http.get(`assets/codelabs/${tutorialId}/${tutorialId}.md`, {responseType: 'text'});
  }

  getTutorialData(tutorialId: string) {
    // return this.http.get(`https://raw.githubusercontent.com/tagazok/workshops/gh-pages/assets/codelabs/${tutorialId}/data.json`);
    return this.http.get(`assets/codelabs/${tutorialId}/data.json`);
  }
}
