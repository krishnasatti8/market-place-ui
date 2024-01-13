import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MyOrdersComponent } from "./my-orders.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("MyOrdersComponent", () => {

  let fixture: ComponentFixture<MyOrdersComponent>;
  let component: MyOrdersComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [MyOrdersComponent]
    });

    fixture = TestBed.createComponent(MyOrdersComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
