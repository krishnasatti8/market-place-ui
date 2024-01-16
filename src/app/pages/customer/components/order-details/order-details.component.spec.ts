import { NO_ERRORS_SCHEMA } from "@angular/core";
import { OrderDetailsComponent } from "./order-details.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("OrderDetailsComponent", () => {

  let fixture: ComponentFixture<OrderDetailsComponent>;
  let component: OrderDetailsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [OrderDetailsComponent]
    });

    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
