import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { EmissionsService } from '../services/emissions.service';

type ChartType = 'line' | 'bar' | 'pie' | 'donut' | 'spline' | 'area' | 'step';

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
          <option value="spline">Spline Chart</option>
          <option value="area">Area Chart</option>
          <option value="step">Step Line Chart</option>
          <option value="donut">Donut Chart</option>
        </select>
      </div>

      <highcharts-chart
        [Highcharts]="Highcharts"
        [options]="chartOptions"
        style="width: 100%; height: 900px; display: block;">
      </highcharts-chart>

      <p class="text-center fw-semibold mt-3" style="font-size: 1.1rem; color: purple;">
        Last updated: {{ lastUpdated }}
      </p>


    }
  `,
  styles: []
})
export class EmissionChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  isDataLoaded: boolean = false;
  selectedChartType: ChartType = 'line';
  lastUpdated: string = '';


  constructor(private emissionsService: EmissionsService) { }

  ngOnInit(): void {
    this.fetchChartData();
  }

  fetchChartData(): void {
    this.emissionsService.getUserEmissions().subscribe(
      (response: any) => {
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
          item.emissions !== undefined && item.emissions !== null
            ? parseFloat(item.emissions.toFixed(2))
            : parseFloat(item.value.toFixed(2))
        );

        this.updateChart(this.selectedChartType, categories, seriesData);
        this.lastUpdated = new Date().toLocaleString();
        this.isDataLoaded = true;
      },
      error => {
        console.error('Error fetching emissions data:', error);
        this.isDataLoaded = true;
      }
    );
  }

  changeChartType(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value as ChartType;
    this.selectedChartType = selectedValue;
    this.fetchChartData();
  }

  updateChart(type: ChartType, categories: string[], seriesData: number[]): void {
    const chartType = type === 'donut' ? 'pie' : (type === 'step' ? 'line' : type);

    this.chartOptions = {
      chart: { type: chartType },
      title: { text: 'Carbon Emissions Breakdown by Date' },
      subtitle: { text: 'Measured in kg CO₂ equivalent' },
      xAxis: type !== 'pie' && type !== 'donut'
        ? {
          categories,
          title: { text: 'Date' },
          labels: { style: { fontSize: '12px', textOutline: 'none' } }
        }
        : undefined,
      yAxis: type !== 'pie' && type !== 'donut'
        ? {
          title: { text: 'Emissions (kg CO₂)' },
          labels: { style: { fontSize: '12px', textOutline: 'none' } }
        }
        : undefined,
      plotOptions: {
        line: {
          step: type === 'step' ? 'left' : undefined,
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px', textOutline: 'none' }
          }
        },
        spline: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px', textOutline: 'none' }
          },
          marker: { radius: 4 }
        },
        bar: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px', textOutline: 'none' }
          }
        },
        area: {
          dataLabels: {
            enabled: true,
            style: { fontSize: '12px', textOutline: 'none' }
          },
          fillOpacity: 0.5
        },
        pie: {
          innerSize: type === 'donut' ? '50%' : undefined,
          dataLabels: {
            style: { fontSize: '14px', textOutline: 'none' }
          }
        }
      },
      series: type === 'pie' || type === 'donut'
        ? [{
          type: 'pie',
          name: 'Emissions',
          innerSize: type === 'donut' ? '50%' : undefined,
          data: categories.map((c, i) => ({ name: c, y: seriesData[i] }))
        }]
        : [{
          type: chartType as any,
          name: 'Emissions',
          data: seriesData
        }]
    };
  }
}
