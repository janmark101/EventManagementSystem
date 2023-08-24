import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Site/home/home.component';
import { UsersServiceService } from './Services/users-service.service';
import { NavbarComponent } from './Site/navbar/navbar.component';
import { SearchComponent } from './Site/search/search.component';
import { SearchPipePipe } from './Services/search-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { EventDetailComponent } from './Site/event-detail/event-detail.component';
import { NewEventComponent } from './Site/new-event/new-event.component';
import { LoginComponent } from './Site/UserAuth/login/login.component';
import { ApiServiceService } from './Services/api-service.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SearchComponent,
    SearchPipePipe,
    EventDetailComponent,
    NewEventComponent,
    LoginComponent,
    SearchPipePipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UsersServiceService,ApiServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
