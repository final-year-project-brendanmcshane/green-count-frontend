import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './settings.component.html' // 🔥 now using separate HTML file
})
export class SettingsComponent implements OnInit {
  enableDarkMode = false;

  ngOnInit(): void {
    const savedDarkMode = localStorage.getItem('enableDarkMode');

    if (savedDarkMode !== null) {
      this.enableDarkMode = savedDarkMode === 'true';
      this.applyDarkMode();
    }
  }

  saveSettings(): void {
    localStorage.setItem('enableDarkMode', this.enableDarkMode.toString());
    this.applyDarkMode();
    console.log('✅ Settings saved:', {
      darkMode: this.enableDarkMode
    });
  }

  applyDarkMode(): void {
    if (this.enableDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  toggleMenu(): void {
    const offcanvas = document.getElementById('offcanvasNav');
    if (offcanvas) {
      if (offcanvas.classList.contains('show')) {
        offcanvas.classList.remove('show');
      } else {
        offcanvas.classList.add('show');
      }
    }
  }
  
}
