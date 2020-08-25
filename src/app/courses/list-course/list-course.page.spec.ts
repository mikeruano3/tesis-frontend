import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListCoursePage } from './list-course.page';

describe('ListCoursePage', () => {
  let component: ListCoursePage;
  let fixture: ComponentFixture<ListCoursePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCoursePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListCoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
