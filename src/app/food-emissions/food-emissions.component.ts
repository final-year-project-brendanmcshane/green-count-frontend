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



  foodItem: string = 'beef';
  foodWeight: number | null = null;
  foodEmissions: number | null = null;

  convertFoodImpact(): void {
    const emissionsFactors: Record<string, number> = {
      beef: 27.0,
      chicken: 6.9,
      pork: 12.1,
      vegetables: 2.0,
      dairy: 3.0
    };

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
