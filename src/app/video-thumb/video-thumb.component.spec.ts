import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoThumbComponent } from './video-thumb.component';

describe('VideoThumbComponent', () => {
  let component: VideoThumbComponent;
  let fixture: ComponentFixture<VideoThumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoThumbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
