import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow">
            <div class="card-header">
              <h2 class="card-title mb-0">Settings</h2>
            </div>
            <div class="card-body">
              <form (ngSubmit)="saveSettings()">
                <!-- Notification Toggle -->
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="notificationsToggle"
                    [(ngModel)]="enableNotifications"
                    name="enableNotifications"
                  />
                  <label for="notificationsToggle" class="form-check-label">
                    Enable Notifications
                  </label>
                </div>

                <!-- Dark Mode Toggle -->
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="darkModeToggle"
                    [(ngModel)]="enableDarkMode"
                    name="enableDarkMode"
                  />
                  <label for="darkModeToggle" class="form-check-label">
                    Enable Dark Mode
                  </label>
                </div>

                <!-- Language Selection -->
                <div class="mb-3">
                  <label for="languageSelect" class="form-label">Language</label>
                  <select
                    id="languageSelect"
                    class="form-select"
                    [(ngModel)]="selectedLanguage"
                    name="selectedLanguage"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>

                <!-- Save Button -->
                <button type="submit" class="btn btn-primary w-100">
                  Save Settings
                </button>
              </form>
                <!-- Back to Home Button -->
                  <a routerLink="/home" class="btn btn-secondary w-100 mt-2">
                    Back to Home
                  </a>

            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SettingsComponent implements OnInit {
  enableNotifications = false;
  enableDarkMode = false;
  selectedLanguage = 'en';

  ngOnInit(): void {
    // Load saved settings from localStorage
    const savedNotifications = localStorage.getItem('enableNotifications');
    const savedDarkMode = localStorage.getItem('enableDarkMode');
    const savedLanguage = localStorage.getItem('selectedLanguage');

    if (savedNotifications !== null) {
      this.enableNotifications = savedNotifications === 'true';
    }

    if (savedDarkMode !== null) {
      this.enableDarkMode = savedDarkMode === 'true';
      this.applyDarkMode();
    }

    if (savedLanguage) {
      this.selectedLanguage = savedLanguage;
    }
  }

  saveSettings(): void {
    // Save to localStorage
    localStorage.setItem('enableNotifications', this.enableNotifications.toString());
    localStorage.setItem('enableDarkMode', this.enableDarkMode.toString());
    localStorage.setItem('selectedLanguage', this.selectedLanguage);

    this.applyDarkMode();

    console.log('✅ Settings saved:', {
      notifications: this.enableNotifications,
      darkMode: this.enableDarkMode,
      language: this.selectedLanguage
    });
  }

  applyDarkMode(): void {
    if (this.enableDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
