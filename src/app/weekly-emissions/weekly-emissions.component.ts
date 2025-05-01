import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weekly-emissions',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf, NgClass],
  templateUrl: './weekly-emissions.component.html',
  styleUrls: ['./weekly-emissions.component.css']
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
  milesDriven = signal<number>(70);
  hoursWorked = signal<number>(40);

  foodEntries = signal<{ type: string; quantity: number }[]>([
    { type: 'beef', quantity: 7 }
  ]);

  addFoodEntry() {
    const current = this.foodEntries();
    this.foodEntries.set([...current, { type: 'beef', quantity: 7 }]);
  }

  updateFoodType(index: number, value: string) {
    const arr = [...this.foodEntries()];
    arr[index].type = value;
    this.foodEntries.set(arr);
  }

  updateFoodQuantity(index: number, value: string | number) {
    const arr = [...this.foodEntries()];
    arr[index].quantity = Number(value) || 0;
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

  toggleMenu(): void {
    const offcanvas = document.getElementById('offcanvasNav');
    if (offcanvas) {
      offcanvas.classList.toggle('show');
    }
  }

  totalEmissions = computed(() => {
    const vehCO2 = this.milesDriven() * (this.vehicleEmissions[this.selectedVehicle()] || 0);
    const workCO2 = this.hoursWorked() * 0.33378;
    const foodCO2 = this.foodEntries().reduce(
      (sum, f) => sum + f.quantity * (this.foodEmissions[f.type] || 0), 0
    );
    return parseFloat((vehCO2 + workCO2 + foodCO2).toFixed(2));
  });

  emissionsBadgeClass(): string {
    const total = this.totalEmissions();
    if (total <= 105) return 'bg-success text-white';       // green
    if (total <= 150) return 'bg-warning text-dark';        // yellow
    return 'bg-danger text-white';                          // red
  }
}
