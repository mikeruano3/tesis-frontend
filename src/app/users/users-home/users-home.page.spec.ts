import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsersHomePage } from './users-home.page';

describe('UsersHomePage', () => {
  let component: UsersHomePage;
  let fixture: ComponentFixture<UsersHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
