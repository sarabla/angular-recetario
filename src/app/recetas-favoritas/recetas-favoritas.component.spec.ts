import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetasFavoritasComponent } from './recetas-favoritas.component';

describe('RecetasFavoritasComponent', () => {
  let component: RecetasFavoritasComponent;
  let fixture: ComponentFixture<RecetasFavoritasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecetasFavoritasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetasFavoritasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
