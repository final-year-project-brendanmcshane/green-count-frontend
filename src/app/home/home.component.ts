import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message: string = '';
  data: any; // To store fetched data
  metric: string = ''; // To store user input for Metric
  unit: string = '';   // To store user input for Unit
  value: number | null = null; // To store user input for Value
  isLoading: boolean = false; // Loading indicator
  summary: any = null; // To store summary data

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch initial data or welcome message
    this.http.get<any>('http://127.0.0.1:5000/').subscribe(data => {
      this.message = data.message;
    });
    this.fetchData(); // Fetch the initial dataset
  }

  fetchData(): void {
    this.isLoading = true;
    this.http.get<any>('http://127.0.0.1:5000/get').subscribe(
      response => {
        console.log('Fetched data:', response); // Debugging fetched data
        this.data = response; // Update table data
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
  }

  addData(): void {
    // Validate user inputs
    if (!this.metric || !this.unit || this.value === null || this.value <= 0) {
      alert('Please provide valid Metric, Unit, and Value.');
      return;
    }

    const payload = {
      Metric: this.metric,
      Unit: this.unit,
      Value: this.value
    };

    this.http.post<any>('http://127.0.0.1:5000/add', payload).subscribe(
      response => {
        console.log('Data added:', response);
        this.fetchData(); // Refresh data table after adding
        // Clear input fields after successful submission
        this.metric = '';
        this.unit = '';
        this.value = null;
      },
      error => {
        console.error('Error adding data:', error);
      }
    );
  }

  summarizeData(): void {
    const metric = "Electricity"; // Example metric; this could be dynamic
    this.http.get<any>(`http://127.0.0.1:5000/summarize?metric=${metric}`).subscribe(
      response => {
        this.summary = response;
        console.log('Summary data:', response);
      },
      error => {
        console.error('Error fetching summary:', error);
      }
    );
  }
}
