import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SpinnerComponent } from "./spinner.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SpinnerComponent", () => {

  let fixture: ComponentFixture<SpinnerComponent>;
  let component: SpinnerComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SpinnerComponent]
    });

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
