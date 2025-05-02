import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [CommonModule, RouterLink, HighchartsChartModule],
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent {
  Highcharts: typeof Highcharts = Highcharts;

  // Highcharts configuration for displaying a pie chart of global emissions
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      height: 410
    },
    title: {
      text: 'Global GHG Emissions by Sector'
    },
    subtitle: {
      text: 'Source: IPCC via Our World in Data',
      style: {
        fontSize: '12px'
      }
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            fontSize: '14px',
            color: '#fff',
            fontWeight: 'normal',
            textOutline: 'none' 
          }
        }
        
      }
    },
    series: [{
      type: 'pie',
      name: 'Share',
      data: [
        { name: 'Energy (electricity, heat, etc)', y: 73.2 },
        { name: 'Industry', y: 5.2 },
        { name: 'Agriculture', y: 11.1 },
        { name: 'Waste', y: 3.2 },
        { name: 'Other', y: 7.3 }
      ]
    }]
  };

  // Toggles the visibility of the sidebar menu for navigation
  toggleMenu(): void {
    const offcanvas = document.getElementById('offcanvasNav');
    if (offcanvas) {
      offcanvas.classList.toggle('show');
    }
  }
}
