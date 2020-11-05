import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminManagementPage } from './admin-management.page';

describe('AdminManagementPage', () => {
  let component: AdminManagementPage;
  let fixture: ComponentFixture<AdminManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
