import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './views/game/game.component';
import { GameListComponent } from './views/game-list/game-list.component';
import { GamefullComponent } from './views/gamefull/gamefull.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { HomeComponent } from './views/home/home.component';
import { DeveloperComponent } from './views/developer/developer.component';

import { CommonModule } from '@angular/common';
import { SignupComponent } from './views/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiserviceService } from './apiservice.service';
import { HttpClientModule } from '@angular/common/http';
import { ResearchBarComponent } from './views/research-bar/research-bar.component';
import { ResearchPageComponent } from './views/research-page/research-page.component';
import { authInterceptorProviders } from './auth.interceptor';
import { PagenotfoundComponent } from './views/pagenotfound/pagenotfound.component';
import { NewsComponent } from './views/news/news.component';
import { NgxSliderModule } from 'ngx-slider-v2';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameListComponent,
    GamefullComponent,
    NavbarComponent,
    HomeComponent,
    SignupComponent,
    DeveloperComponent,
    ResearchBarComponent,
    ResearchPageComponent,
    PagenotfoundComponent,
    NewsComponent
  ],
imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    YouTubePlayerModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule, 
    NgxSliderModule
  ],
  providers: [ApiserviceService, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
