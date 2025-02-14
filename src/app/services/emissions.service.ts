import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

export interface EmissionData {
  category: string;   // e.g., 'Car', 'Transport', 'Energy'
  type: string;       // e.g., 'Diesel', 'Petrol', 'Electricity'
  value: number;
  unit?: string;      // Optional as it will be determined by backend
}

@Injectable({
  providedIn: 'root'
})
export class EmissionsService {
  private apiUrl = 'http://localhost:5000';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  addEmission(data: EmissionData) {
    const headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.authService.getToken()}`
    );
    return this.http.post(`${this.apiUrl}/add-user-emission`, data, { headers });
  }

  getUserEmissions() {
    const headers = new HttpHeaders().set(
      'Authorization', `Bearer ${this.authService.getToken()}`
    );
    return this.http.get(`${this.apiUrl}/get-user-emissions`, { headers });
  }
}