import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.css'
})
export class AiChatComponent implements AfterViewChecked {
  @ViewChild('chatBody') private chatBodyContainer!: ElementRef;

  isOpen = false;
  userInput = '';
  isLoading = false;
  
  defaultQuestions: string[] = [
    "What is the architecture of this AI Assistant?",
    "מה הניסיון של נדב ב-Full Stack ו-AI?",
    "What is Nadav's tech stack?",
  ];

  messages: ChatMessage[] = [
    { 
      sender: 'ai', 
      text: "Hi! I'm Nadav's AI Assistant 🤖. Ask me anything about his experience, AI projects, education, or tech stack! (תרגיש חופשי לשאול גם בעברית)" 
    }
  ];

  private apiUrl = 'https://nadav-ai-backend.onrender.com/api/chat';

  constructor(private http: HttpClient) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  selectQuestion(question: string) {
    this.userInput = question;
    this.sendMessage();
  }

  // הפונקציה שפתרה את השגיאה בקומפיילר
  isHebrew(text: string): boolean {
    if (!text) return false;
    const hebrewPattern = /[\u0590-\u05FF]/;
    return hebrewPattern.test(text);
  }

  sendMessage() {
    if (!this.userInput.trim() || this.isLoading) return;

    const userMsg = this.userInput.trim();
    this.messages.push({ sender: 'user', text: userMsg });
    this.userInput = '';
    this.isLoading = true;

    this.http.post<{ reply: string }>(this.apiUrl, { message: userMsg }).subscribe({
      next: (res: { reply: string }) => {
        this.messages.push({ sender: 'ai', text: res.reply });
        this.isLoading = false;
      },
      error: () => {
        this.messages.push({ sender: 'ai', text: "Sorry, I ran into a connection issue. Please try again in a moment." });
        this.isLoading = false;
      }
    });
  }

  private scrollToBottom(): void {
    try {
      if (this.chatBodyContainer) {
        this.chatBodyContainer.nativeElement.scrollTop = this.chatBodyContainer.nativeElement.scrollHeight;
      }
    } catch(err) { }
  }
}