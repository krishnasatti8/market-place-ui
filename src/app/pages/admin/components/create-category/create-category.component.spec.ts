import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CreateCategoryComponent } from "./create-category.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("CreateCategoryComponent", () => {

  let fixture: ComponentFixture<CreateCategoryComponent>;
  let component: CreateCategoryComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [CreateCategoryComponent]
    });

    fixture = TestBed.createComponent(CreateCategoryComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
