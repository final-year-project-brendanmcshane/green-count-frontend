import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-emission-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // ✅ Imports FormsModule for ngModel
  templateUrl: './emission-chat.component.html',
  styleUrl: './emission-chat.component.css'
})
export class EmissionChatComponent {
  messages: { sender: string; text: string }[] = [];
  userMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  sendMessage() {
    if (!this.userMessage.trim()) return; // Prevents empty messages

    const userText = this.userMessage.trim();
    this.messages.push({ sender: 'user', text: userText });
    this.userMessage = '';

    this.http.post<{ response: string }>('http://127.0.0.1:5000/chat', { message: userText })
      .subscribe({
        next: (response) => {
          this.messages.push({ sender: 'ai', text: response.response });
        },
        error: (error) => {
          console.error('Chat error:', error);
        }
      });
  }

  trackByFn(index: number, item: any) {
    return index;
  }

  goHome(): void {
    this.router.navigate(['/home']);
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
