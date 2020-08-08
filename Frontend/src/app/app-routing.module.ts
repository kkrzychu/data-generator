import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: '', redirectTo: '/generator', pathMatch: 'full'},
  { path: 'generator', component: MainContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
