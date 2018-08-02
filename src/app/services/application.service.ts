import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  applicationInfos: any;

  constructor(private http: HttpClient) {}

  /**
   * Fetch the application configuration from the provided remote URL.
   * This method will resolve with an empty value if we managed to fetch sucessfully.
   */
  async initializeApp(): Promise<void | Object> {
    try {
      this.applicationInfos = await this.http
        .get(environment.application)
        .toPromise();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
