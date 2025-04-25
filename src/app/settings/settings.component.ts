import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  enableDarkMode = false;
  enableAnimations = true;

  ngOnInit(): void {
    const savedDarkMode = localStorage.getItem('enableDarkMode');
    const savedAnimations = localStorage.getItem('enableAnimations');

    if (savedDarkMode !== null) {
      this.enableDarkMode = savedDarkMode === 'true';
      this.applyDarkMode();
    }

    if (savedAnimations !== null) {
      this.enableAnimations = savedAnimations === 'true';
      this.applyAnimations();
    }
  }

  saveSettings(): void {
    localStorage.setItem('enableDarkMode', this.enableDarkMode.toString());
    localStorage.setItem('enableAnimations', this.enableAnimations.toString());
    this.applyDarkMode();
    this.applyAnimations();

    console.log('✅ Settings saved:', {
      darkMode: this.enableDarkMode,
      animations: this.enableAnimations
    });
  }

  applyDarkMode(): void {
    if (this.enableDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  applyAnimations(): void {
    if (this.enableAnimations) {
      document.body.classList.remove('no-animations');
    } else {
      document.body.classList.add('no-animations');
    }
  }

  toggleMenu(): void {
    const offcanvas = document.getElementById('offcanvasNav');
    if (offcanvas) {
      offcanvas.classList.toggle('show');
    }
  }
}
