// emissions.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmissionsService {
  private apiUrl = 'http://localhost:5000';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  addEmission(data: any) {
    const headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.authService.getUserId()}`
    );
    return this.http.post(`${this.apiUrl}/add-user-emission`, data, { headers });
  }

  getUserEmissions() {
    const headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.authService.getUserId()}`
    );
    return this.http.get(`${this.apiUrl}/get-user-emissions`, { headers });
  }
}