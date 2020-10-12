import { Component } from '@angular/core';

import { QuestionService } from '../services/question.service';
import { QuestionBase } from '../question/question-base';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dynamic',
  template: `
    <div>
      <h2>Job Application for Heroes</h2>
      <app-dynamic-form [questions]="questions$ | async"></app-dynamic-form>
    </div>
  `,
  providers:  [QuestionService]
})
export class FormExample {
  questions$: Observable<QuestionBase<any>[]>;

  constructor(service: QuestionService) {
    this.questions$ = service.getQuestions();
  }
}