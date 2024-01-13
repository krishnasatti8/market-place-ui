import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CreateFaqComponent } from "./create-faq.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("CreateFaqComponent", () => {

  let fixture: ComponentFixture<CreateFaqComponent>;
  let component: CreateFaqComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [CreateFaqComponent]
    });

    fixture = TestBed.createComponent(CreateFaqComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
