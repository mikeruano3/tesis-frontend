import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostEditorPage } from './post-editor.page';

describe('PostEditorPage', () => {
  let component: PostEditorPage;
  let fixture: ComponentFixture<PostEditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostEditorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
