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

  constructor(private emissionsService: EmissionsService) {}

  ngOnInit(): void {
    this.emissionsService.getUserEmissions().subscribe(
      (response: any) => {
        console.log('Response from getUserEmissions:', response);

        // Ensure we get an array of emissions data
        let emissionsArray: any[] = [];
        if (Array.isArray(response)) {
          emissionsArray = response;
        } else if (response && Array.isArray(response.data)) {
          emissionsArray = response.data;
        } else {
          console.error('Unexpected data format:', response);
        }
        console.log('Emissions array:', emissionsArray);

        // Map the API data to chart-friendly arrays.
        const categories = emissionsArray.map(item =>
          item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Unknown'
        );
        const seriesData = emissionsArray.map(item =>
          (item.emissions !== undefined && item.emissions !== null)
            ? item.emissions
            : item.value
        );

        console.log('Mapped categories:', categories);
        console.log('Mapped seriesData:', seriesData);

        // Update the chart options with dynamic data.
        this.chartOptions = {
          title: { text: 'User Emissions Over Time' },
          xAxis: {
            categories: categories,
            title: { text: 'Date' }
          },
          yAxis: {
            title: { text: 'Emissions (kg CO2)' }
          },
          series: [{
            type: 'line',
            name: 'Emissions',
            data: seriesData
          }]
        };

        this.isDataLoaded = true;
      },
      error => {
        console.error('Error fetching emissions data:', error);
        this.isDataLoaded = true;
      }
    );
  }
}
