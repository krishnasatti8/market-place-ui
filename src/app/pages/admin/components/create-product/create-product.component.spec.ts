import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CreateProductComponent } from "./create-product.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("CreateProductComponent", () => {

  let fixture: ComponentFixture<CreateProductComponent>;
  let component: CreateProductComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [CreateProductComponent]
    });

    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
