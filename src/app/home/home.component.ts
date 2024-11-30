import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message: string = '';
  data: any = []; // To store fetched data
  metric: string = ''; // User input for Metric
  unit: string = ''; // User input for Unit
  value: number | null = null; // User input for Value
  isLoading: boolean = false; // Loading indicator
  summary: any = null; // To store summary data
  conversionMetric: string = ''; // User input for conversion metric
  conversionValue: number | null = null; // User input for conversion value
  targetUnit: string = ''; // User input for target unit
  convertedData: any = null; // To store converted data

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('http://127.0.0.1:5000/').subscribe(data => {
      this.message = data.message;
    });
    this.fetchData(); // Fetch the initial dataset
  }

  fetchData(): void {
    this.isLoading = true;
    this.http.get<any>('http://127.0.0.1:5000/get').subscribe(
      response => {
        console.log('Fetched data:', response);
        this.data = response;
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
  }

  addData(): void {
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
        this.fetchData();
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
    const metric = this.metric || 'Electricity';
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

  convertData(): void {
    if (!this.conversionMetric || this.conversionValue === null || this.conversionValue <= 0 || !this.targetUnit) {
      alert('Please provide valid Metric, Value (greater than 0), and Target Unit for conversion.');
      return;
    }
  
    const payload = {
      Metric: this.conversionMetric.trim(),
      Value: this.conversionValue,
      TargetUnit: this.targetUnit.trim()
    };
  
    console.log('Payload sent to backend:', payload); // Log payload here
  
    this.http.post<any>('http://127.0.0.1:5000/convert', payload).subscribe(
      response => {
        console.log('Conversion successful:', response);
        this.convertedData = response;
      },
      error => {
        console.error('Error converting data:', error); // Log error response
      }
    );
  }
  
  
  
}
