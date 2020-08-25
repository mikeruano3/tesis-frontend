import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditCoursePage } from './edit-course.page';

describe('EditCoursePage', () => {
  let component: EditCoursePage;
  let fixture: ComponentFixture<EditCoursePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCoursePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
