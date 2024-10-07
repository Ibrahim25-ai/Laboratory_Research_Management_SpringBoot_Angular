import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePublicationComponent } from './manage-publication.component';

describe('ManagePublicationComponent', () => {
  let component: ManagePublicationComponent;
  let fixture: ComponentFixture<ManagePublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePublicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
