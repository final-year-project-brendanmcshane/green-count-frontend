import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tip-of-the-day',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card mb-4">
      <div class="card-header bg-success text-white">
        <h5 class="mb-0">Eco Tip of the Day</h5>
      </div>
      <div class="card-body">
        <h5>{{ currentTip.title }}</h5>
        <p>{{ currentTip.description }}</p>
        <div>
          <span class="badge rounded-pill" 
                [ngClass]="getCategoryClass(currentTip.category)">
            {{ currentTip.category }}
          </span>
          <small class="text-muted ms-2" *ngIf="currentTip.impact">
            Impact: {{ currentTip.impact }}
          </small>
        </div>
      </div>
      <div class="card-footer bg-light">
        <button class="btn btn-sm btn-outline-success" (click)="getNewTip()">
          Show another tip
        </button>
      </div>
    </div>
  `
})
export class TipOfTheDayComponent implements OnInit {
  // Collection of eco tips
  private tips = [
    {
      title: 'Switch to LED Bulbs',
      description: 'Replace your traditional bulbs with LED lights to reduce energy consumption by up to 80%.',
      category: 'Energy',
      impact: 'High'
    },
    {
      title: 'Unplug Electronics',
      description: 'Unplug chargers and electronics when not in use to eliminate phantom energy use.',
      category: 'Energy',
      impact: 'Medium'
    },
    {
      title: 'Meatless Monday',
      description: 'Skip meat one day a week to significantly reduce your carbon footprint.',
      category: 'Food',
      impact: 'High'
    },
    {
      title: 'Use Public Transport',
      description: 'Take the bus or train instead of driving once a week to reduce emissions.',
      category: 'Transport',
      impact: 'High'
    },
    {
      title: 'Shorter Showers',
      description: 'Reduce your shower time by 2 minutes to save water and the energy used to heat it.',
      category: 'Water',
      impact: 'Medium'
    },
    {
      title: 'Eat Seasonal Produce',
      description: 'Choose fruits and vegetables that are in season locally to reduce transportation emissions.',
      category: 'Food',
      impact: 'Medium'
    },
    {
      title: 'Reusable Water Bottle',
      description: 'Carry a reusable water bottle instead of buying plastic bottles.',
      category: 'Waste',
      impact: 'Medium'
    },
    {
      title: 'Lower Thermostat',
      description: 'Reduce your thermostat by 1°C in winter to save energy and emissions.',
      category: 'Energy',
      impact: 'High'
    },
    {
      title: 'Carpool to Work',
      description: 'Share rides with colleagues to reduce the number of vehicles on the road.',
      category: 'Transport',
      impact: 'Medium'
    },
    {
      title: 'Air-Dry Laundry',
      description: 'Skip the dryer and hang your clothes to dry naturally when possible.',
      category: 'Energy',
      impact: 'Medium'
    },
    {
      title: 'Buy Local Products',
      description: 'Purchase locally produced goods to reduce transportation emissions.',
      category: 'Shopping',
      impact: 'Medium'
    },
    {
      title: 'Turn Off Lights',
      description: 'Make sure to turn off lights when leaving a room.',
      category: 'Energy',
      impact: 'Low'
    },
    {
      title: 'Use Reusable Bags',
      description: 'Bring your own shopping bags to reduce plastic waste.',
      category: 'Waste',
      impact: 'Low'
    },
    {
      title: 'Reduce Food Waste',
      description: 'Plan meals carefully and use leftovers to minimize food waste.',
      category: 'Food',
      impact: 'High'
    },
    {
      title: 'Walk for Short Trips',
      description: 'Choose walking instead of driving for journeys under a mile.',
      category: 'Transport',
      impact: 'Medium'
    }
  ];
  
  currentTip = this.tips[0];
  private usedIndices = new Set<number>();
  
  ngOnInit(): void {
    // Start with a random tip
    this.getNewTip();
  }
  
  getNewTip(): void {
    // If all tips have been shown, reset
    if (this.usedIndices.size >= this.tips.length) {
      this.usedIndices.clear();
    }
    
    // Find a tip that hasn't been shown yet
    let availableTips: number[] = [];
    for (let i = 0; i < this.tips.length; i++) {
      if (!this.usedIndices.has(i)) {
        availableTips.push(i);
      }
    }
    
    // Select a random tip from available ones
    const randomIndex = availableTips[Math.floor(Math.random() * availableTips.length)];
    this.currentTip = this.tips[randomIndex];
    this.usedIndices.add(randomIndex);
  }
  
  getCategoryClass(category: string): string {
    // Return appropriate color classes based on category
    switch (category.toLowerCase()) {
      case 'energy':
        return 'bg-warning text-dark';
      case 'transport':
        return 'bg-info text-dark';
      case 'food':
        return 'bg-success text-white';
      case 'waste':
        return 'bg-danger text-white';
      case 'water':
        return 'bg-primary text-white';
      case 'shopping':
        return 'bg-secondary text-white';
      default:
        return 'bg-light text-dark';
    }
  }
}