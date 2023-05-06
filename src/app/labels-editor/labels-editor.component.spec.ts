import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsEditorComponent } from './labels-editor.component';

describe('LabelsEditorComponent', () => {
  let component: LabelsEditorComponent;
  let fixture: ComponentFixture<LabelsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelsEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
