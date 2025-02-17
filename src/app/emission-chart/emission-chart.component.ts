import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-emission-chart',
  standalone: true,
  imports: [HighchartsChartModule],
  template: `
    <highcharts-chart
      [Highcharts]="Highcharts"
      [options]="chartOptions"
      style="width: 100%; height: 400px; display: block;">
    </highcharts-chart>
  `
})
export class EmissionChartComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: { text: 'User Emissions Over Time' },
    xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] },
    series: [{
      type: 'line',
      name: 'Emissions',
      data: [29, 71, 106, 129, 144]
    }]
  };
}
