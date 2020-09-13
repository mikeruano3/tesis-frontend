import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostViewerPage } from './post-viewer.page';

describe('PostViewerPage', () => {
  let component: PostViewerPage;
  let fixture: ComponentFixture<PostViewerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostViewerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostViewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
