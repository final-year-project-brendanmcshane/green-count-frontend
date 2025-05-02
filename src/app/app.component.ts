import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'green-count';
  data: any;

  constructor(private dataService: DataService) {}

  fetchData(): void {
    this.dataService.getData().subscribe(response => {
      this.data = response;
    });
  }

  addData(): void {
    const newData = { id: 2 };  
    this.dataService.addData(newData).subscribe(response => {
      console.log('Data added:', response);
    });
  }
}
