import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WebConfirmPasswordPage } from './web-confirm-password.page';

describe('WebConfirmPasswordPage', () => {
  let component: WebConfirmPasswordPage;
  let fixture: ComponentFixture<WebConfirmPasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebConfirmPasswordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WebConfirmPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
