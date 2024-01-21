import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TrackOrderComponent } from "./track-order.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("TrackOrderComponent", () => {

  let fixture: ComponentFixture<TrackOrderComponent>;
  let component: TrackOrderComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [TrackOrderComponent]
    });

    fixture = TestBed.createComponent(TrackOrderComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
