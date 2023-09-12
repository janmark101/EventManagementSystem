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
import { ProfileComponent } from './Site/UserAuth/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule} from '@angular/material/dialog';
import { ConfirmComponentComponent } from './Site/confirm-component/confirm-component.component';
import { EditEventComponent } from './Site/edit-event/edit-event.component';
import { EditProfileComponent } from './Site/edit-profile/edit-profile.component';
import { RegisterComponent } from './Site/UserAuth/register/register.component';

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
    ProfileComponent,
    ConfirmComponentComponent,
    EditEventComponent,
    EditProfileComponent,
    RegisterComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [UsersServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
