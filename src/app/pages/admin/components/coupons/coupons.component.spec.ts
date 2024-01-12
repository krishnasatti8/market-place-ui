import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CouponsComponent } from "./coupons.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("CouponsComponent", () => {

  let fixture: ComponentFixture<CouponsComponent>;
  let component: CouponsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [CouponsComponent]
    });

    fixture = TestBed.createComponent(CouponsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
