import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weekly-emissions',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf],
  template: `
<div class="container mt-4">
  <h2 class="text-center mb-4">Weekly Emission Calculator</h2>

  <div class="card shadow-sm">
    <div class="card-body">

      <!-- Vehicle Type -->
      <div class="mb-3">
        <label class="form-label">Select Vehicle Type:</label>
        <select class="form-select w-auto" (change)="updateVehicleType($event)">
          <option *ngFor="let vType of vehicleTypes" [value]="vType">{{ vType }}</option>
        </select>
      </div>

      <!-- Miles Driven (Weekly) -->
      <div class="mb-3">
        <label class="form-label">Miles Driven This Week:</label>
        <input
          type="range"
          class="form-range w-50"
          min="0"
          max="700"
          [value]="milesDriven()"
          (input)="updateMilesDriven($event)"
        />
        <span class="ms-2 fw-bold">{{ milesDriven() }} miles</span>
      </div>

      <!-- Hours Worked (Weekly) -->
      <div class="mb-3">
        <label class="form-label">Hours Worked This Week:</label>
        <input
          type="range"
          class="form-range w-50"
          min="0"
          max="168"
          [value]="hoursWorked()"
          (input)="updateHoursWorked($event)"
        />
        <span class="ms-2 fw-bold">{{ hoursWorked() }} hours</span>
      </div>

      <!-- Dynamic Food Entries -->
      <div *ngFor="let food of foodEntries(); let i = index" class="mb-3">
        <label class="form-label">Select Food Item:</label>
        <select
          class="form-select w-auto"
          [value]="food.type"
          (change)="updateFoodType(i, $any($event.target).value)">
          <option *ngFor="let fType of foodTypes" [value]="fType">{{ fType }}</option>
        </select>

        <label class="form-label mt-2">Food Consumed This Week (kg):</label>
        <input
          type="range"
          class="form-range w-50"
          min="0"
          max="35"
          [value]="food.quantity"
          (input)="updateFoodQuantity(i, $any($event.target).value)"
        />
        <span class="ms-2 fw-bold">{{ food.quantity }} kg</span>

        <hr *ngIf="i < foodEntries().length - 1">
      </div>

      <!-- Add Another Food -->
      <div class="mb-4">
        <button class="btn btn-outline-success" (click)="addFoodEntry()">Add Another Food</button>
      </div>

      <!-- Calculate and Result -->
      <div class="text-center">
        <button class="btn btn-primary me-3" (click)="calculateEmissions()">Calculate</button>
        <h3 class="d-inline-block mt-3">Total Weekly Emissions: {{ totalEmissions() }} kg CO2</h3>
      </div>

    </div>
  </div>

  <!-- Back to Home -->
  <div class="text-center mt-4">
    <button class="btn btn-secondary" (click)="goHome()">Back to Home</button>
  </div>
</div>
  `,
  styles: []
})
export class WeeklyEmissionsComponent {

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
  milesDriven = signal<number>(70); // default weekly
  hoursWorked = signal<number>(40); // default weekly

  foodEntries = signal<{ type: string; quantity: number }[]>([
    { type: 'beef', quantity: 7 }
  ]);

  addFoodEntry() {
    const current = this.foodEntries();
    this.foodEntries.set([...current, { type: 'beef', quantity: 7 }]);
  }

  updateFoodType(index: number, value: string) {
    const arr = [...this.foodEntries()]; arr[index].type = value;
    this.foodEntries.set(arr);
  }

  updateFoodQuantity(index: number, value: string | number) {
    const arr = [...this.foodEntries()]; arr[index].quantity = Number(value) || 0;
    this.foodEntries.set(arr);
  }

  updateVehicleType(event: Event) {
    this.selectedVehicle.set((event.target as HTMLSelectElement).value);
  }

  updateMilesDriven(event: Event) {
    this.milesDriven.set(Number((event.target as HTMLInputElement).value) || 0);
  }

  updateHoursWorked(event: Event) {
    this.hoursWorked.set(Number((event.target as HTMLInputElement).value) || 0);
  }

  calculateEmissions() {
    console.log('Total Emissions:', this.totalEmissions());
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  totalEmissions = computed(() => {
    const vehCO2 = this.milesDriven() * (this.vehicleEmissions[this.selectedVehicle()] || 0);
    const workCO2 = this.hoursWorked() * 0.33378;
    const foodCO2 = this.foodEntries().reduce(
      (sum, f) => sum + f.quantity * (this.foodEmissions[f.type] || 0), 0
    );
    return (vehCO2 + workCO2 + foodCO2).toFixed(2);
  });
}
