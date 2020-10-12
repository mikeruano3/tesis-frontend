import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeTabsPage } from './home-tabs.page';

describe('HomeTabsPage', () => {
  let component: HomeTabsPage;
  let fixture: ComponentFixture<HomeTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTabsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
