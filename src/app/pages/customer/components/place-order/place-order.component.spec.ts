import { NO_ERRORS_SCHEMA } from "@angular/core";
import { PlaceOrderComponent } from "./place-order.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("PlaceOrderComponent", () => {

  let fixture: ComponentFixture<PlaceOrderComponent>;
  let component: PlaceOrderComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [PlaceOrderComponent]
    });

    fixture = TestBed.createComponent(PlaceOrderComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
