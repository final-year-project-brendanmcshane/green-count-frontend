import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message: string = '';
  data: any; // To store fetched data

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://127.0.0.1:5000/').subscribe(data => {
      this.message = data.message;
    });
  }

  // fetchData(): void {
  //   this.http.get<any>('http://127.0.0.1:5000/get').subscribe(response => {
  //     this.data = response;
  //   });
  // }

  addData(): void {
    const payload = {
      Metric: "Energy Usage", // Example default value
      Unit: "kWh",            // Example default value
      Value: Math.random() * 100 // Random value for testing
    };
  
    this.http.post<any>('http://127.0.0.1:5000/add', payload).subscribe(response => {
      console.log("Data added:", response);
      this.fetchData(); // Refresh data after adding
    });
  }
  

  isLoading: boolean = false;

  fetchData(): void {
    this.isLoading = true;
    this.http.get<any>('http://127.0.0.1:5000/get').subscribe(response => {
      this.data = response;
      this.isLoading = false;
    });
  }





}
