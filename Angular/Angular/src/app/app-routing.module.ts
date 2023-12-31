import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Site/home/home.component';
import { SearchComponent } from './Site/search/search.component';
import { EventDetailComponent } from './Site/event-detail/event-detail.component';
import { NewEventComponent } from './Site/new-event/new-event.component';
import { LoginComponent } from './Site/UserAuth/login/login.component';
import { ProfileComponent } from './Site/UserAuth/profile/profile.component';
import { RegisterComponent } from './Site/UserAuth/register/register.component';

const routes: Routes = [
  {path : '', component:HomeComponent, pathMatch:'full'},
  {path: 'Search', component:SearchComponent},
  {path : 'EventDetail/:id', component: EventDetailComponent},
  {path : 'NewEvent', component : NewEventComponent},
  {path: 'Login',component: LoginComponent},
  {path: 'Register',component: RegisterComponent},
  {path: 'profile/:id',component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
