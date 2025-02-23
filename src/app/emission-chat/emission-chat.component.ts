import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-emission-chat',
  standalone: true,
  imports: [FormsModule], // Only needed for ngModel
  templateUrl: './emission-chat.component.html',
  styleUrls: ['./emission-chat.component.css']
})
export class EmissionChatComponent {
  userMessage: string = '';
  aiResponse: string | null = null;

  constructor(private http: HttpClient) {}

  sendMessage(): void {
    if (!this.userMessage.trim()) return; // Prevent empty messages

    this.http.post<{ response: string }>('http://127.0.0.1:5000/chat', { message: this.userMessage })
      .subscribe({
        next: (response) => {
          this.aiResponse = response.response;
          this.userMessage = ''; // Clear input after sending
        },
        error: (error) => {
          console.error('Error:', error);
          this.aiResponse = 'Error getting response from AI.';
        }
      });
  }
}
