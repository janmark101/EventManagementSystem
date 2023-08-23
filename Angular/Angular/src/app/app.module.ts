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
<<<<<<< HEAD
import { EventDetailComponent } from './Site/event-detail/event-detail.component';
import { NewEventComponent } from './Site/new-event/new-event.component';
import { LoginComponent } from './Site/UserAuth/login/login.component';
=======
>>>>>>> 177418a2ecec474daee5da93aa53c39a19ae706d
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SearchComponent,
<<<<<<< HEAD
    SearchPipePipe,
    EventDetailComponent,
    NewEventComponent,
    LoginComponent
=======
    SearchPipePipe
>>>>>>> 177418a2ecec474daee5da93aa53c39a19ae706d
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UsersServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
