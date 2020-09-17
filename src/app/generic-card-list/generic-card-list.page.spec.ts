import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenericCardListPage } from './generic-card-list.page';

describe('GenericCardListPage', () => {
  let component: GenericCardListPage;
  let fixture: ComponentFixture<GenericCardListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericCardListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenericCardListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
