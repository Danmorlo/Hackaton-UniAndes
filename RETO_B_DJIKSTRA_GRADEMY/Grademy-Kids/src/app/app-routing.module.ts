import { DragGameComponent } from './games/drag-game/drag-game.component';
import { DrawingGameComponent } from './games/drawing-game/drawing-game.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterKidComponent } from './components/register-kid/register-kid.component';
import { RegisterParentComponent } from './components/parent/register-parent/register-parent.component';
import { RegisterSpecialistComponent } from './components/specialist/register-specialist/register-specialist.component';
import { HomeParentComponent } from './components/parent/home-parent/home-parent.component';
import { ReportComponent } from './components/parent/report/report.component';
import { HomeSpecialistComponent } from './components/specialist/home-specialist/home-specialist.component';
import { LoginSpecialistComponent } from './components/specialist/login-specialist/login-specialist.component';
import { LoginParentComponent } from './components/parent/login-parent/login-parent.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'draw', component: DrawingGameComponent },
  { path: 'drag', component: DragGameComponent },
  { path: 'kid', component: RegisterKidComponent, outlet: 'proyectList' },
  { path: 'parent', component: RegisterParentComponent, outlet: 'proyectList' },
  {
    path: 'specialist',
    component: RegisterSpecialistComponent,
    outlet: 'proyectList'
  },
  { path: 'home', component: HomeComponent },
  { path: 'home-parent', component: HomeParentComponent },
  { path: 'home-specialist', component: HomeSpecialistComponent },
  { path: 'report/:id', component: ReportComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login-specialist', component: LoginSpecialistComponent },
  { path: 'login-parent', component: LoginParentComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-kid', component: RegisterKidComponent },
  { path: 'register-parent', component: RegisterParentComponent },
  { path: 'register-specialist', component: RegisterSpecialistComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
  { path: 'draw', component: DrawingGameComponent },

  { path: 'profile', component: ProfileComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
