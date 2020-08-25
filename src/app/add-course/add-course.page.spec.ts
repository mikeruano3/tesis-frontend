import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddCoursePage } from './add-course.page';

describe('AddCoursePage', () => {
  let component: AddCoursePage;
  let fixture: ComponentFixture<AddCoursePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCoursePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
