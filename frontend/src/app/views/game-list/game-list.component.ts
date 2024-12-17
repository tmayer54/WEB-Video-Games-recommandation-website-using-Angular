import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit{
  gameArray: Game[] = [];

  constructor(gameService: GameService) {
    this.gameArray = gameService.getGames();
  };
  
  ngOnInit(): void {};
}
