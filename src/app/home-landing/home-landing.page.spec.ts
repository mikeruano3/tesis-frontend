import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeLandingPage } from './home-landing.page';

describe('HomeLandingPage', () => {
  let component: HomeLandingPage;
  let fixture: ComponentFixture<HomeLandingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeLandingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeLandingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
