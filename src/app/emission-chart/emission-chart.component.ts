import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { EmissionsService } from '../services/emissions.service';

@Component({
  selector: 'app-emission-chart',
  standalone: true,
  imports: [HighchartsChartModule],
  template: `
    @if (!isDataLoaded) {
      <div>Loading chart data...</div>
    } @else {
      <div>
        <label for="chartType">Select Chart Type:</label>
        <select id="chartType" (change)="changeChartType($event)">
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
        </select>
      </div>

      <highcharts-chart
        [Highcharts]="Highcharts"
        [options]="chartOptions"
        style="width: 100%; height: 400px; display: block;">
      </highcharts-chart>
    }
  `,
  styles: []
})
export class EmissionChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  isDataLoaded: boolean = false;
  selectedChartType: 'line' | 'bar' | 'pie' = 'line'; // Default chart type

  constructor(private emissionsService: EmissionsService) {}

  ngOnInit(): void {
    this.fetchChartData();
  }

  fetchChartData(): void {
    this.emissionsService.getUserEmissions().subscribe(
      (response: any) => {
        console.log('Response from getUserEmissions:', response);

        let emissionsArray: any[] = [];
        if (Array.isArray(response)) {
          emissionsArray = response;
        } else if (response && Array.isArray(response.data)) {
          emissionsArray = response.data;
        } else {
          console.error('Unexpected data format:', response);
        }

        const categories = emissionsArray.map(item =>
          item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Unknown'
        );
        const seriesData = emissionsArray.map(item =>
          (item.emissions !== undefined && item.emissions !== null)
            ? item.emissions
            : item.value
        );

        this.updateChart(this.selectedChartType, categories, seriesData);
        this.isDataLoaded = true;
      },
      error => {
        console.error('Error fetching emissions data:', error);
        this.isDataLoaded = true;
      }
    );
  }

  changeChartType(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value as 'line' | 'bar' | 'pie';
    this.selectedChartType = selectedValue;
    this.fetchChartData(); // Re-fetch and update chart
  }

  updateChart(type: 'line' | 'bar' | 'pie', categories: string[], seriesData: number[]): void {
    this.chartOptions = {
      chart: { type: type },
      title: { text: 'User Emissions Over Time' },
      xAxis: { categories: categories, title: { text: 'Date' } },
      yAxis: { title: { text: 'Emissions (kg CO2)' } },
      series: type === 'pie'
        ? [{ type: 'pie', name: 'Emissions', data: categories.map((c, i) => ({ name: c, y: seriesData[i] })) }]
        : [{ type: type, name: 'Emissions', data: seriesData }]
    };
  }
}
