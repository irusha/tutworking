import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageThumbnailComponent } from './manage-thumbnail.component';

describe('ManageThumbnailComponent', () => {
  let component: ManageThumbnailComponent;
  let fixture: ComponentFixture<ManageThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageThumbnailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
