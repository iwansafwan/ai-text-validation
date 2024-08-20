import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userText: string = '';
  validationResult: string = '';
  wordCount: number = 0;
  triggerWords: string[] = ['submit', 'approve', 'confirm'];
  triggerWordFound: boolean = false;

  onTextChange() {
    this.wordCount = this.countWords(this.userText);
    this.triggerWordFound = this.containsTriggerWord(this.userText);
  }

  countWords(text: string): number {
    return text.trim().split(/\s+/).length;
  }

  containsTriggerWord(text: string): boolean {
    const words = text.toLowerCase().split(/\s+/);
    return this.triggerWords.some(triggerWord => words.includes(triggerWord));
  }

  canSubmit(): boolean {
    return this.wordCount >= 1 && this.wordCount <= 16 && this.triggerWordFound;
  }

  onSubmit() {
    this.validationResult = 'Text submitted successfully!';
  }
}
