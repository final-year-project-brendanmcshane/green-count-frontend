import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmissionsService } from '../services/emissions.service';
import { AuthService } from '../services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { EmissionChartComponent } from '../emission-chart/emission-chart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, EmissionChartComponent],
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
  foodItem: string = '';   // Declare foodItem
  foodWeight: number = 0;  // Declare foodWeight
  foodEmissions: number | null = null;  // Declare foodEmissions
  energyEmissions: number | null = null; // Declare energyEmissions
  userEmissions: any[] = [];
  newEmission: any = { metric: '', unit: '', value: null };  // For new emission data
  private apiUrl: string = 'http://127.0.0.1:5000';  // Define apiUrl here



  constructor(private http: HttpClient, private emissionsService: EmissionsService, private authService: AuthService) {}

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
      Metric: this.conversionMetric.trim().toLowerCase(),  // Normalize to lowercase
      Value: this.conversionValue,
      TargetUnit: this.targetUnit.trim()
    };
  
    console.log('Payload sent to backend:', payload);
  
    this.http.post<any>('http://127.0.0.1:5000/convert', payload).subscribe(
      response => {
        console.log('Conversion successful:', response);
  
        // Log the entire response to check if emissions are included
        console.log('Full response:', response);
  
        // If Emissions is available in the response, store it
        if (response && response.Emissions !== undefined) {
          this.energyEmissions = response.Emissions;  // Store the energy-related emissions
          console.log('Energy emissions:', this.energyEmissions); // Log emissions to verify
        } else {
          console.error('Emissions data is missing in the response.');
        }
  
        // Store other data as well
        this.convertedData = response;
      },
      error => {
        console.error('Error converting data:', error);
      }
    );
  }
  
  
  

  convertFoodImpact(): void {
    const payload = {
      FoodItem: this.foodItem,  // e.g., 'beef'
      Weight: this.foodWeight    // e.g., 2 kg
    };
  
    this.http.post<any>('http://127.0.0.1:5000/food-impact', payload).subscribe(
      response => {
        console.log('Food impact calculated:', response);
        this.foodEmissions = response.Emissions;  // Store the calculated emissions
      },
      error => {
        console.error('Error calculating food impact:', error);
      }
    );
  }
  

  calculateEmissions(): void {
    if (!this.conversionMetric || this.conversionValue === null || this.conversionValue <= 0) {
      alert('Please provide valid Metric and Value (greater than 0).');
      return;
    }
  
    const payload = {
      Metric: this.conversionMetric.trim(),
      Value: this.conversionValue
    };
  
    console.log('Payload sent to backend:', payload);
  
    this.http.post<any>('http://127.0.0.1:5000/convert', payload).subscribe(
      response => {
        console.log('Emissions calculation successful:', response);
        this.energyEmissions = response.Emissions; // Store the calculated emissions
      },
      error => {
        console.error('Error calculating emissions:', error);
      }
    );
  }

  loadUserEmissions(): void {
    this.emissionsService.getUserEmissions().subscribe({
      next: (data) => {
        console.log('User emissions loaded:', data);
        this.userEmissions = Array.isArray(data) ? data : [];
      },
      error: (error) => {
        console.error('Error fetching user emissions:', error);
      }
    });
  }
  
  addEmission(): void {
    console.log('Current newEmission state:', this.newEmission); // Debug line

    // Validate inputs
    if (!this.newEmission.category || 
        !this.newEmission.type || 
        !this.newEmission.value || 
        this.newEmission.value <= 0) {
        alert(`Please provide valid data:
            Category: ${this.newEmission.category}
            Type: ${this.newEmission.type}
            Value: ${this.newEmission.value}`);
        return;
    }

    const emissionData = {
        category: this.newEmission.category,
        type: this.newEmission.type,
        value: this.newEmission.value
    };

    console.log('Sending emission data:', emissionData); // Debug line

    this.emissionsService.addEmission(emissionData).subscribe({
        next: (response) => {
            console.log('Emission added successfully:', response);
            this.loadUserEmissions();
            // Reset form
            this.newEmission = { category: '', type: '', value: null };
        },
        error: (error) => {
            console.error('Error adding emission:', error);
            alert('Error adding emission: ' + error.message);
        }
    });
}
  
  
  
  
  
  
  
  
}
