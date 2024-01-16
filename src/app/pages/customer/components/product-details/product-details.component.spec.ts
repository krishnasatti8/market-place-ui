import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ProductDetailsComponent } from "./product-details.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ProductDetailsComponent", () => {

  let fixture: ComponentFixture<ProductDetailsComponent>;
  let component: ProductDetailsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ProductDetailsComponent]
    });

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
