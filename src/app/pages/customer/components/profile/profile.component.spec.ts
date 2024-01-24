import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ProfileComponent } from "./profile.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ProfileComponent", () => {

  let fixture: ComponentFixture<ProfileComponent>;
  let component: ProfileComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ProfileComponent]
    });

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
