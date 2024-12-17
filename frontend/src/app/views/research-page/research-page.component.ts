import { Component } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import { Game } from 'src/app/models/game';
import { userDTO} from 'src/app/models/userDTO';
import { GameService } from 'src/app/services/game.service';
import { Options } from 'ngx-slider-v2';

@Component({
  selector: 'app-research-page',
  templateUrl: './research-page.component.html',
  styleUrls: ['./research-page.component.css']
})
   
export class ResearchPageComponent {
  searchQuery!: string;
  searchType: string = 'game'; //Default to user search
  searchResults: any;
  searchOption: string = 'name'; //Default to name search
  gameName : string = '';
  developer : string = '';
  gameArray: Game[] = [];
  userArray: userDTO[] = [];
  minPrice: number = 0;
  maxPrice: number = 600;
  options: Options = {
    floor: 0,
    ceil: 100
  };
  constructor(private dataService: ApiserviceService, private gameService : GameService) {}

  search(): void {
    // Your search logic here based on searchQuery and searchType
    if (this.searchType === 'user') {
      this.userArray = [];
      let username = '';
      this.dataService.getUsers().subscribe((res) => {
        this.searchResults = res.data;
        for (let i = 0; i < Object.keys(this.searchResults)?.length; i++) {
          username = this.searchResults[i]?.username.toUpperCase();
          if (username.includes(this.searchQuery.toUpperCase())) {
            this.userArray.push(this.searchResults[i]);
          }
        }
      });
  
    } else if (this.searchType === 'game') {
      this.gameArray = [];
      this.dataService.researchGame(this.gameName, this.minPrice, this.maxPrice, this.developer).subscribe((res) => {
        this.searchResults = res.data;
        for (let i = 0; i < Object.keys(this.searchResults)?.length; i++) {
          this.gameArray.push(this.gameService.getGameById(this.searchResults[i]?.ID));
        }
      });
    }
  }
}