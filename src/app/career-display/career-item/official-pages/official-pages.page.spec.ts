import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OfficialPagesPage } from './official-pages.page';

describe('OfficialPagesPage', () => {
  let component: OfficialPagesPage;
  let fixture: ComponentFixture<OfficialPagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficialPagesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OfficialPagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
