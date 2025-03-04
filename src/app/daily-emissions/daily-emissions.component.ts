import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-daily-emissions',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf],
  template: `
<div class="container mt-4">
  <h2 class="text-center mb-4">Daily Emission Calculator</h2>

  <!-- Card to wrap our form inputs -->
  <div class="card shadow-sm">
    <div class="card-body">

      <!-- Vehicle Type -->
      <div class="mb-3">
        <label class="form-label">Select Vehicle Type:</label>
        <select class="form-select w-auto" (change)="updateVehicleType($event)">
          <option *ngFor="let vType of vehicleTypes" [value]="vType">{{ vType }}</option>
        </select>
      </div>

      <!-- Miles Driven -->
      <div class="mb-3">
        <label class="form-label">Miles Driven:</label>
        <input
          type="range"
          class="form-range w-50"
          min="0"
          max="100"
          [value]="milesDriven()"
          (input)="updateMilesDriven($event)"
        />
        <span class="ms-2 fw-bold">{{ milesDriven() }} miles</span>
      </div>

      <!-- Hours Worked -->
      <div class="mb-3">
        <label class="form-label">Hours Worked:</label>
        <input
          type="range"
          class="form-range w-50"
          min="0"
          max="24"
          [value]="hoursWorked()"
          (input)="updateHoursWorked($event)"
        />
        <span class="ms-2 fw-bold">{{ hoursWorked() }} hours</span>
      </div>

      <!-- Food Selection -->
      <div class="mb-3">
        <label class="form-label">Select Food Item:</label>
        <select class="form-select w-auto" (change)="updateFoodType($event)">
          <option *ngFor="let fType of foodTypes" [value]="fType">{{ fType }}</option>
        </select>
      </div>

      <!-- Food Quantity -->
      <div class="mb-3">
        <label class="form-label">Food Consumed (kg):</label>
        <input
          type="range"
          class="form-range w-50"
          min="0"
          max="5"
          [value]="foodQuantity()"
          (input)="updateFoodQuantity($event)"
        />
        <span class="ms-2 fw-bold">{{ foodQuantity() }} kg</span>
      </div>

      <!-- Calculate Button + Result -->
      <div class="text-center">
        <button class="btn btn-primary me-3" (click)="calculateEmissions()">Calculate</button>
        <h3 class="d-inline-block mt-3">Total Daily Emissions: {{ totalEmissions() }} kg CO2</h3>
      </div>

    </div>
  </div>

  <!-- Back to Home Button -->
  <div class="text-center mt-4">
    <button class="btn btn-secondary" (click)="goHome()">Back to Home</button>
  </div>

</div>
  `,
  styles: []
})
export class DailyEmissionsComponent {

  constructor(private router: Router) {}

  vehicleTypes = ['diesel', 'petrol', 'hybrid', 'taxi', 'bus', 'rail', 'flight', 'motorbike'];
  foodTypes = ['beef', 'chicken', 'vegetables', 'pork', 'dairy'];

  vehicleEmissions: Record<string, number> = {
    diesel: 0.27334, petrol: 0.26473, hybrid: 0.20288, taxi: 0.14861,
    bus: 0.10846, rail: 0.03546, flight: 0.27257, motorbike: 0.11367
  };

  foodEmissions: Record<string, number> = {
    beef: 27, chicken: 6, vegetables: 0.5, pork: 12, dairy: 2.5
  };

  selectedVehicle = signal<string>('petrol');
  milesDriven = signal<number>(10);
  hoursWorked = signal<number>(8);
  selectedFood = signal<string>('beef');
  foodQuantity = signal<number>(1);

  updateVehicleType(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedVehicle.set(target.value);
  }

  updateMilesDriven(event: Event) {
    const target = event.target as HTMLInputElement;
    this.milesDriven.set(Number(target.value) || 0);
  }

  updateHoursWorked(event: Event) {
    const target = event.target as HTMLInputElement;
    this.hoursWorked.set(Number(target.value) || 0);
  }

  updateFoodType(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedFood.set(target.value);
  }

  updateFoodQuantity(event: Event) {
    const target = event.target as HTMLInputElement;
    this.foodQuantity.set(Number(target.value) || 0);
  }

  calculateEmissions() {
    console.log('Total Emissions:', this.totalEmissions());
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  totalEmissions = computed(() => {
    const vehicleCO2 = this.milesDriven() * (this.vehicleEmissions[this.selectedVehicle()] || 0);
    const workCO2 = this.hoursWorked() * 0.33378;
    const foodCO2 = this.foodQuantity() * (this.foodEmissions[this.selectedFood()] || 0);
    return (vehicleCO2 + workCO2 + foodCO2).toFixed(2);
  });
}
