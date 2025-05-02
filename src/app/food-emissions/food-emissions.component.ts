import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-emissions',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './food-emissions.component.html'
})
export class FoodEmissionsComponent {

  constructor(private router: Router) {}


  // Stores the selected food item, defaulting to 'beef'
  foodItem: string = 'beef';
  // User-provided weight input (in kg) for the selected food item
  foodWeight: number | null = null;
  // Holds the calculated emissions value (in kg CO₂)
  foodEmissions: number | null = null;

  convertFoodImpact(): void {
    // Emissions factors in kg CO₂ per kg of food
    const emissionsFactors: Record<string, number> = {
      beef: 27.0,
      chicken: 6.9,
      pork: 12.1,
      vegetables: 2.0,
      dairy: 3.0
    };

    // Calculate and round emissions if weight is valid
    const factor = emissionsFactors[this.foodItem];
    this.foodEmissions = this.foodWeight ? +(this.foodWeight * factor).toFixed(2) : null;
  }

  toggleMenu(): void {
    const offcanvas = document.getElementById('offcanvasNav');
    if (offcanvas) {
      offcanvas.classList.toggle('show');
    }
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
  
}
