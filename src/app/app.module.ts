import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Filters } from './filters/filters.component';
import { UserList } from './users-list/users-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Filters,
    UserList
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
