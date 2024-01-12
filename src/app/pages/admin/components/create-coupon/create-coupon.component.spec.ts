import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CreateCouponComponent } from "./create-coupon.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("CreateCouponComponent", () => {

  let fixture: ComponentFixture<CreateCouponComponent>;
  let component: CreateCouponComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [CreateCouponComponent]
    });

    fixture = TestBed.createComponent(CreateCouponComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
