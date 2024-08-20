import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-text-validator',
  templateUrl: './text-validator.component.html',
  styleUrls: ['./text-validator.component.css']
})
export class TextValidatorComponent implements OnInit {
  model: any;
  userText: string = '';
  validationResult: string = '';
  triggerWords: string[] = ['submit', 'approve', 'confirm'];

  async ngOnInit() {
    // Load a pre-trained Word2Vec or similar model (this is a placeholder)
    this.model = await tf.loadLayersModel('/assets/word2vec-model.json');
  }

  async findSimilarWords(word: string) {
    const wordVector = this.model.getEmbedding(word);
    const similarWords = this.model.findClosest(wordVector, 10);  // Find top 10 similar words
    return similarWords;
  }

  onSubmit() {
    // Example: Check if the userText contains any of the trigger words
    const lowerCaseText = this.userText.toLowerCase();
    const containsTriggerWord = this.triggerWords.some(word => lowerCaseText.includes(word));

    if (containsTriggerWord) {
      this.validationResult = 'Valid text! The text contains a trigger word.';
    } else {
      this.validationResult = 'Invalid text. The text does not contain any trigger words.';
    }
  }
}
