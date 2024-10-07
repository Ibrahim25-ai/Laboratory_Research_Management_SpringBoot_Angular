import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageToolsComponent } from './manage-tools.component';

describe('ManageToolsComponent', () => {
  let component: ManageToolsComponent;
  let fixture: ComponentFixture<ManageToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
