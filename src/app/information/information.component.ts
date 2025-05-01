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

  resources = [
    {
      title: 'UK Government - Net Zero Strategy',
      description: 'Official UK government plan for reducing emissions to net zero by 2050.',
      url: 'https://www.gov.uk/government/publications/net-zero-strategy',
      image: 'https://www.gov.uk/assets/icons/net-zero-icon.png'
    },
    {
      title: 'Carbon Footprint Calculator',
      description: 'Estimate your personal carbon emissions and learn how to reduce them.',
      url: 'https://www.carbonfootprint.com/calculator.aspx',
      image: 'https://www.carbonfootprint.com/images/logo.png'
    },
    {
      title: 'UK Energy Saving Trust',
      description: 'Tips on how to save energy at home, on the road, and in daily life.',
      url: 'https://energysavingtrust.org.uk/',
      image: 'https://energysavingtrust.org.uk/wp-content/uploads/2022/02/EST-logo.png'
    },
    {
      title: 'Sustainable Development Goals',
      description: 'Learn about the UN’s 17 goals for global sustainability and climate action.',
      url: 'https://sdgs.un.org/goals',
      image: 'https://sdgs.un.org/themes/custom/unsdg/images/SDG-wheel.png'
    }
  ];

  toggleMenu(): void {
    const offcanvas = document.getElementById('offcanvasNav');
    if (offcanvas) {
      offcanvas.classList.toggle('show');
    }
  }
}
