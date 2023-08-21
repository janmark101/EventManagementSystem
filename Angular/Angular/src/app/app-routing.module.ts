import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Site/home/home.component';
import { SearchComponent } from './Site/search/search.component';

const routes: Routes = [
  {path : '', component:HomeComponent, pathMatch:'full'},
  {path: 'Search', component:SearchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
