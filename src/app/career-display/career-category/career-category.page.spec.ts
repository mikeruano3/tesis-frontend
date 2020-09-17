import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CareerCategoryPage } from './career-category.page';

describe('CareerCategoryPage', () => {
  let component: CareerCategoryPage;
  let fixture: ComponentFixture<CareerCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerCategoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CareerCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
