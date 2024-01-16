import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ReviewComponent } from "./review.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ReviewComponent", () => {

  let fixture: ComponentFixture<ReviewComponent>;
  let component: ReviewComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ReviewComponent]
    });

    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
