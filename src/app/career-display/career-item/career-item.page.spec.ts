import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CareerItemPage } from './career-item.page';

describe('CareerItemPage', () => {
  let component: CareerItemPage;
  let fixture: ComponentFixture<CareerItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CareerItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
