import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LoginComponent } from './components/login/login.component';
import { MenuBarComponent } from './generic/menu-bar/menu-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { TrackOrderComponent } from './components/track-order/track-order.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    LoginComponent,
    SignupComponent,
    TrackOrderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
