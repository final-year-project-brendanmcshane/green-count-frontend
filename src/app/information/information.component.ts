import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent {
  // List of environmental and UK government resources
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
}
