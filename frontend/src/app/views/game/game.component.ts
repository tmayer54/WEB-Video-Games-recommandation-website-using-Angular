import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommentDTO } from 'src/app/models/CommentDTO';
import { Game } from 'src/app/models/game';
import { userDTO } from 'src/app/models/userDTO';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input() game!: Game;
  @Input() game_idx! : number;

  protected rating: number = 0;

  protected average_rating:number = 0;
  protected average_rating_round:number = 0;

  public allComments: CommentDTO[] = [];

  public devArray:userDTO[] = []
  public gameDev: userDTO = new userDTO(21,"louisouiii","louisouiii",1,"louis.rolland@utbm.fr","./assets/images/Pesto_tete.png");

  constructor(private router: Router,private GameService:GameService) {
    
  };

  ngOnInit(): void {
    this.getAverageRating();
    this.getDevInfo();
  };


  readMore() {
    this.router.navigate(['/', 'game', this.game.ID]); //navigate to the game page
  }
  calldev() {
    this.GameService.devpage(this.game.dev); //navigate to the dev page
  }
  setrating(rating: number):void{ //set the rating of the game ( stars)
    this.rating = rating;
  }

  getAverageRating(): void {
    let count = 0;
    let avg = 0 ;

    this.GameService.getAllComments(this.game.ID).subscribe(
      (response) => {
        this.allComments = response.data;
        //this.getAverageRating();

        this.allComments.forEach(comment => {
          count++
          avg+=comment.note
        });
    
        this.average_rating = avg / count

        this.average_rating = parseFloat(this.average_rating.toFixed(2));
    
        this.average_rating_round = Math.round(this.average_rating);

        if(count == 0) {
          this.average_rating = 0
        }
        
      },
      (error) => {
        console.log('Error fetching all comments:', error);
      }
    ); 

    
  }

  getDevInfo() {
    this.GameService.getUserInfo(this.game.dev).subscribe(
      (response) => {
        this.devArray = response.data;

        this.gameDev = this.devArray[0];
        return;
      },
      (error) => {
        console.log('Error fetching dev info:', error);
      }
    );
  }

}