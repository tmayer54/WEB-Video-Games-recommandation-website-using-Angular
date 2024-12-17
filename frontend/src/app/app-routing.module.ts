import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './views/game-list/game-list.component';
import { GamefullComponent } from './views/gamefull/gamefull.component';
import { HomeComponent } from './views/home/home.component';
import { SignupComponent } from './views/signup/signup.component';
import { DeveloperComponent } from './views/developer/developer.component';
import { GameComponent } from './views/game/game.component';
import { ResearchPageComponent } from './views/research-page/research-page.component';
import { authGuard } from './services/auth.guard';
import { PagenotfoundComponent } from './views/pagenotfound/pagenotfound.component';
import { NewsComponent } from './views/news/news.component';
import { modifGuard } from './services/modif.guard';

const routes: Routes = [
//Chemins vers les pages
  {path: '', component: HomeComponent},
  {path: 'store', component: GameListComponent},
  {path: 'register', component: SignupComponent, canActivate: [authGuard]},
  {path: 'developer', component: DeveloperComponent},
  {path: 'developer/:id', component: DeveloperComponent},
  {path: 'user/:id', component: DeveloperComponent},
  {path: 'usermodif/:id', component: SignupComponent, canActivate: [modifGuard]},
  {path: 'game/:id', component : GamefullComponent},
  {path: 'research', component : ResearchPageComponent},
  {path: 'news', component : NewsComponent},
  {path: '**', component: PagenotfoundComponent}

   ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }