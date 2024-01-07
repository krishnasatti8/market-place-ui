import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CartComponent } from "./cart.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("CartComponent", () => {

  let fixture: ComponentFixture<CartComponent>;
  let component: CartComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [CartComponent]
    });

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
