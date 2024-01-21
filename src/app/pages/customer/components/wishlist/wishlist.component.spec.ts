import { NO_ERRORS_SCHEMA } from "@angular/core";
import { WishlistComponent } from "./wishlist.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("WishlistComponent", () => {

  let fixture: ComponentFixture<WishlistComponent>;
  let component: WishlistComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [WishlistComponent]
    });

    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
